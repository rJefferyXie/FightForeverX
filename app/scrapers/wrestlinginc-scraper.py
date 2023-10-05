import time
from bs4 import BeautifulSoup as bs
from selenium import webdriver
from selenium.webdriver.common.by import By

import os
import firebase_admin
from firebase_admin import credentials, firestore
import random

current_dir = os.path.dirname(__file__)
json_path = os.path.join(current_dir, "../src/fightforeverx-firebase-adminsdk.json")
cred = credentials.Certificate(json_path)
firebase_admin.initialize_app(cred)
db = firestore.client()

def getArticleData():
  urls = [
    {
      'company': 'wwe',
      'url': 'https://www.wrestlinginc.com/category/wwe-news/'
    },
    {
      'company': 'aew',
      'url': 'https://www.wrestlinginc.com/category/aew-news/'
    },
    {
      'company': 'njpw',
      'url': 'https://www.wrestlinginc.com/category/njpw-news/'
    }
  ]
  
  browser = webdriver.Firefox()
  for url in urls:
    oldArticles = db.collection(url['company'] + "articles").list_documents()
    for art in oldArticles:
      art.delete()

    browser.get(url['url'])
    time.sleep(1)

    articleURLs = getArticleURLs(browser)
    articlePreviews = getArticlePreviews(browser)

    articleOrder = 1
    while articleURLs:
      idx = random.randint(0, len(articleURLs) - 1)
      articleURL = articleURLs.pop(idx)
      article = parseArticle(browser, articleURL)
      article['preview'] = articlePreviews[idx]
      article['order'] = articleOrder
      articleOrder += 1
      uploadArticle(article, url['company'])
    
    print("--- Finished Uploading " + str(len(articlePreviews)) + " Articles For " + url['company'].upper() + " ---")
    
  browser.close()

def getArticlePreviews(browser):
  html = browser.page_source
  soup = bs(html, "lxml")
  articles = soup.find_all('div', class_='article-preview')

  articlePreviews = []
  for article in articles:
    preview = article.get_text()
    articlePreviews.append(preview)

  return articlePreviews

def getArticleURLs(browser):
  html = browser.page_source
  soup = bs(html, "lxml")
  articles = soup.find_all('div', class_='read-more')

  articleURLs = []
  for article in articles:
    href = article.find('a').get('href')
    articleURLs.append("https://www.wrestlinginc.com" + href)

  return articleURLs

def parseArticle(browser, url):
  browser.get(url)
  time.sleep(1)

  html = browser.page_source
  soup = bs(html, "lxml")

  newsArticle = {}
  browser.find_element(By.CLASS_NAME, 'news-article')
  newsArticle["title"] = browser.find_element(By.CLASS_NAME, 'title-gallery').text
  newsArticle["image"] = browser.find_element(By.CLASS_NAME, 'gallery-image').get_attribute('src')
  newsArticle["date"] = browser.find_element(By.CSS_SELECTOR, 'time').text
  newsArticle["author"] = browser.find_element(By.CLASS_NAME, 'byline-author').text
  newsArticle["authorURL"] = browser.find_element(By.CLASS_NAME, 'byline-author').get_attribute('href')
  newsArticle["homeURL"] = browser.current_url

  articleContent = soup.select_one(".columns-holder")
  articleText = []
  articleLinks = {}

  paragraphs = articleContent.find_all('p')
  for pg in paragraphs:
    a_tags = pg.find_all('a')
    for a_tag in a_tags:
      if len(a_tag.text) > 0:
        articleLinks[a_tag.text] = a_tag.get('href')
        
    text = pg.text
    articleText.append(text)

  newsArticle['text'] = articleText
  newsArticle['links'] = articleLinks

  return newsArticle

def uploadArticle(newsArticle, company):
  originalURL = newsArticle['homeURL'].split('/')
  sanitizedURL = originalURL[-2]

  print('Started uploading ' + sanitizedURL)

  articleRef = db.collection(company + "articles").document(sanitizedURL)
  articleRef.set(newsArticle)

  print("Finished uploading " + sanitizedURL)

getArticleData()