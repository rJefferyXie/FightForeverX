import time
from bs4 import BeautifulSoup as bs
from selenium import webdriver
from selenium.webdriver.common.by import By

import os
import firebase_admin
from firebase_admin import credentials, firestore

current_dir = os.path.dirname(__file__)
json_path = os.path.join(current_dir, "../src/fightforeverx-firebase-adminsdk.json")
cred = credentials.Certificate(json_path)
firebase_admin.initialize_app(cred)
db = firestore.client()

wrestlers = {
  "IYO SKY": {
    "wrestlerURL": "iyosky",
    "matchesURL": "https://www.wrestlingdata.com/index.php?befehl=bios&wrestler=15571&bild=1&details=11"
  }
}

def getMatches(browser, wrestlerName):
  matches = []

  # first 10 matches
  for i in range(1, 11):
    try:
      matchData = browser.find_element(By.XPATH, '//*[@title="Match #{}"]'.format(i)).text
      matchData = matchData.split("\n")
      matchData[0] = matchData[0].replace(str(i) + " ", "")

      wonMatch = False
      if matchData[2].find(wrestlerName) < matchData[2].find("defeated"):
        wonMatch = True

      match = {
        "eventName": matchData[0],
        "eventDetails": matchData[1],
        "eventResult": matchData[2],
        "wonMatch": wonMatch
      }

      matches.append(match)

    except:
      continue
  
  return matches

def uploadMatches(matches, wrestlerURL):
  print('Started uploading matches for ' + wrestlerURL + ".")

  for i in range(0, 10):
    matchesRef = db.collection("wrestlers").document(wrestlerURL).collection("matches").document("Match " + str(i))
    matchesRef.set(matches[i])

  print("Finished uploading matches for " + wrestlerURL + ".\n")

browser = webdriver.Firefox()
for key, value in wrestlers.items():
  wrestlerName = key
  browser.get(value['matchesURL'])
  matches = getMatches(browser, wrestlerName)
  uploadMatches(matches, value['wrestlerURL'])

browser.close()
  