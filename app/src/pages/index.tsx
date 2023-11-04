"use client"

// React + Next
import { useEffect, useState } from 'react';

// MUI
import FilterListIcon from '@mui/icons-material/FilterList';

// Components
import Articles from '@/components/articles';
import ArticleView from '@/components/articleView';
import ArticleFilter from '@/components/articleFilter';
import LoadingArticles from '@/components/loadingArticles';

// Interfaces
import Article from '@/interfaces/article';

// Firebase
import { db } from '@/firebase/config';
import { collection, getDocs, query, orderBy } from "firebase/firestore"; 

const Home = () => {
  const [showingFilters, setShowingFilters] = useState(false);
  const [filters, setFilters] = useState(["AEW", "WWE", "NJPW"]);

  const [WWEArticles, setWWEArticles] = useState<Article[]>([]);
  const [AEWArticles, setAEWArticles] = useState<Article[]>([]);
  const [NJPWArticles, setNJPWArticles] = useState<Article[]>([]);
  const [activeArticles, setActiveArticles] = useState<Article[]>([]);

  const [currentArticle, setCurrentArticle] = useState<Article>();

  useEffect(() => {
    const getData = async () => {
      const articleMap = [
        {
          company: 'wwe',
          callback: setWWEArticles
        },
        {
          company: 'aew',
          callback: setAEWArticles
        },
        {
          company: 'njpw',
          callback: setNJPWArticles
        },
      ]

      try {
        articleMap.map(async (article) => {
          const wrestlerArticles: Article[] = [];

          const articleRef = collection(db, article.company + "articles");
          const querySnapshot = await getDocs(query(articleRef, orderBy("order", "asc")));
          querySnapshot.forEach((doc) => {
            const newsArticle = doc.data() as Article;
            newsArticle.company = article.company;
            newsArticle.text = newsArticle.text.map((text: string) => {
              return renderText(text, newsArticle);
            });
            wrestlerArticles.push(newsArticle);
          });
  
          article.callback(wrestlerArticles);
        });
      } catch (err) {
        console.log(err);
      }
    }

    getData();
  }, []);

  useEffect(() => {
    const combineArraysInOrder = (arrays: Article[][]) => {
      const combinedArray = [];
  
      for (let i = 0; i < 27; i++) {
        for (const arr of arrays) {
          if (i < arr.length) {
            combinedArray.push(arr[i]);
          }
        }
      }
    
      return combinedArray;
    }

    const activeArrays: Article[][] = [];
    if (filters.includes('AEW')) {
      activeArrays.push(AEWArticles)
    }

    if (filters.includes('WWE')) {
      activeArrays.push(WWEArticles)
    }

    if (filters.includes('NJPW')) {
      activeArrays.push(NJPWArticles)
    }

    setActiveArticles(combineArraysInOrder(activeArrays));
  }, [AEWArticles, WWEArticles, NJPWArticles, filters]);

  const updateFilters = (filter: string) => {
    if (filters.includes(filter)) {
      setFilters(filters.filter(f => f !== filter));
    } else {
      setFilters(filters => [...filters, filter]);
    }
  }

  const renderText = (text: any, article: any) => {
    if (!text || !text.length) return;

    Object.keys(article.links).forEach((link) => {
      if (typeof text === 'string') {
        if (text.includes(link)) {
          text = text.split(link);
          const atag = (
            <a 
              href={article.links[link]} 
              className="text-blue-900"
              target="_blank" 
              rel="noopener noreferrer"
            >
              {link}
            </a>
          );
          text.splice(1, 0, atag);
        }

        return;
      }
      
      text.forEach((textLine: string, idx: number) => {
        if (typeof textLine !== 'string') return;

        if (textLine.includes(link)) {
          let subarray = text.splice(idx, 1).toString();
          subarray = subarray.split(link);
          const atag = (
            <a 
              href={article.links[link]} 
              className="text-blue-900"
              target="_blank" 
              rel="noopener noreferrer"
            >
              {link}
            </a>
          );
          subarray.splice(1, 0, atag)
          text.splice(idx, 0, ...subarray)
        }
      })
    })

    return text;
  }

  return (
    <div className="flex flex-col overflow-y-auto h-screen w-screen bg-zinc-50 lg:ml-20 sm:p-4">
      {currentArticle && 
        <ArticleView 
          currentArticle={currentArticle} 
          setCurrentArticle={setCurrentArticle}
        />
      }

      <main className="flex flex-col w-full sm:w-[87rem] text-black mx-auto mb-16">
        <h1 className="font-semibold text-xl my-2 mx-auto">ARTICLES</h1>

        <div 
          className="flex text-black bg-white w-fit my-2 ml-auto mr-2 py-2 px-4 rounded-3xl drop-shadow-sm cursor-pointer"
          onClick={() => setShowingFilters(!showingFilters)}
        >
          <FilterListIcon 
            className="text-black mr-2"
          />
          <p>Filters</p>
        </div>

        <div 
          className="flex flex-col justify-evenly bg-white text-white overflow-hidden px-4 my-2 mx-2 rounded-md drop-shadow-sm duration-300 transition-transform"
          style={{
            height: showingFilters ? '8.5rem' : '0',
            transitionProperty: 'height'
          }}
        >
          <ArticleFilter 
            text={"Show AEW Articles"} 
            company={"AEW"} 
            filters={filters} 
            updateFilters={updateFilters}
          />

          <ArticleFilter 
            text={"Show WWE Articles"} 
            company={"WWE"} 
            filters={filters} 
            updateFilters={updateFilters}
          />

          <ArticleFilter 
            text={"Show NJPW Articles"} 
            company={"NJPW"} 
            filters={filters} 
            updateFilters={updateFilters}
          />
        </div>

        {!(AEWArticles.length && WWEArticles.length && NJPWArticles.length) ? 
          <LoadingArticles/> :
          <Articles 
            articles={activeArticles} 
            setCurrentArticle={setCurrentArticle}
          />
        }
      </main>
    </div>
  )
}

export default Home;