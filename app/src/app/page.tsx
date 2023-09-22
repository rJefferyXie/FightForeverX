"use client"

// React + Next
import { useEffect, useState } from 'react';

// Firebase
import { db } from '@/firebase/config';
import { collection, getDocs } from "firebase/firestore"; 

const Home = () => {
  const [articles, setArticles] = useState<any>([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const wrestlerArticles: any = [];

        const querySnapshot = await getDocs(collection(db, "wwearticles"));
        querySnapshot.forEach((doc) => {
          wrestlerArticles.push(doc.data());
        });

        setArticles(wrestlerArticles);
      } catch (err) {
        console.log(err);
      }
    }

    getData();
  }, []);

  const renderText = (articleIdx: number) => {
    const article = articles[articleIdx];

    article.text = article.text.map((text: string, idx: number) => {
      if (text === "\n") {
        return <br key={idx}></br>
      }

      if (!text || !text.length) return;

      Object.keys(article.links).map((key: string) => {
        if (text.includes(key)) {
          console.log(key, article.links[key]);
        }
      });
      
      const words = text.split(" ");
      const replacedWords = words.map((word, index) => {
        const link = Object.keys(article.links).find(link => link === word);
    
        if (link) {
          return (
            <a key={index} href={article.links[link]} target="_blank" rel="noopener noreferrer">
              {word}
            </a>
          );
        }
        return word;
      });

      return replacedWords.join(" ");
    })

    return article.text;
  }

  return (
    <div className="flex flex-col overflow-y-auto h-full w-screen bg-zinc-50 sm:ml-20 sm:p-4">
      <div className="flex">
        <button
          className="px-2 py-1 mx-1 rounded-md text-white bg-neutral-500"
        >
          WWE
        </button>

        <button
          className="px-2 py-1 mx-1 rounded-md text-white bg-neutral-500"
        >
          AEW
        </button>
        
        <button
          className="px-2 py-1 mx-1 rounded-md text-white bg-neutral-500"
        >
          NJPW
        </button>
      </div>

      <main className="flex flex-wrap justify-center sm:w-9/12 mx-auto my-16">
        {
          articles.length && 
            articles.map((article: any, idx: number) => {
              return (
                <div 
                  key={idx}
                  className="flex sm:flex-col drop-shadow-md text-black border-slate-300 border-b p-2 sm:p-0 sm:m-2 h-[8rem] sm:w-[27rem] sm:h-[28rem] sm:rounded-md bg-white"
                >
                  <img
                    className="w-40 sm:w-full sm:rounded-t-md"
                    src={article.image}
                    alt={article.title}
                  />

                  <div className="flex flex-col overflow-hidden">
                    <p className="font-semibold mx-2 sm:mt-1 line-clamp-3">
                      {article.title}
                    </p>

                    <p className="hidden sm:line-clamp-4 mx-2 mb-2">
                      {renderText(idx)}
                    </p>

                    <div className="flex justify-center mt-auto mb-1">
                      <button 
                        className="px-2 py-1 mx-2 rounded-md bg-sky-700 text-white hover:bg-sky-600 duration-200 ease-in-out"
                      >
                        Read More
                      </button>

                      <a
                        className="px-2 py-1 mx-2 rounded-md bg-zinc-700 text-white hover:bg-zinc-600 duration-200 ease-in-out"
                        href={article.links.homeRef}
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        Visit Source
                      </a>
                    </div>
                  </div>

                </div>
              )
            })
          
        }
      </main>
    </div>
  )
}

export default Home;