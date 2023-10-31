"use client"

// Next + React
import { useEffect, useState } from 'react';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import WrestlerActions from '@/store/actions/wrestlerActions';

// Firebase
import { db } from '@/firebase/config';
import { collection, doc, getDocs, query, orderBy } from "firebase/firestore"; 

const Wrestler = () => {
  const [matches, setMatches] = useState<any[]>([]);

  // Redux
  const dispatch = useDispatch();
  const wrestlerState = useSelector((state: any) => state.wrestler.currentWrestler);

  useEffect(() => {
    const getData = async () => {
      try {
        const wrestlersRef = collection(db, "wrestlers");
        const wrestlerRef = doc(wrestlersRef, wrestlerState.url);
        const matchesRef = collection(wrestlerRef, "matches");

        const wrestlerMatches: any[] = [];
        const querySnapshot = await getDocs(matchesRef);
        querySnapshot.forEach(async (matchDoc) => {
          const matchData = matchDoc.data();
          wrestlerMatches.push(matchData);
        });

        setMatches(wrestlerMatches);
      } catch (err) {
        console.log(err);
      }
    }

    getData();
  }, []);

  return (
    <div className="flex flex-col h-screen w-screen overflow-y-auto bg-zinc-50 text-black lg:ml-20 sm:p-4">
      <p className="font-semibold text-xl mx-auto">
        {wrestlerState.name}
      </p>

      <p 
        className="font-semibold text-white w-fit px-2 py-1 rounded-md mx-auto my-2"
        style={{backgroundColor: wrestlerState.color}}
      >
        {wrestlerState.nickname}
      </p>

      <p>
        {wrestlerState.height}
      </p>

      <p>
        {wrestlerState.weight}
      </p>

      <p>
        {wrestlerState.hometown}
      </p>

      <p>
        {wrestlerState.gender}
      </p>

      <a 
        href={wrestlerState.social}                     
        target="_blank"       
        rel="noopener noreferrer"
      >
        {wrestlerState.social}
      </a>

      <img
        className="w-64 rounded-md"
        src={wrestlerState.image}
        alt={"An image of " + wrestlerState.name}
      />

      {matches.length > 0 && 
        matches.map((match, idx: number) => {
          return (
            <div 
              key={idx} 
              className="my-1 p-1 text-white text-shadow"
              style={{backgroundColor: match.wonMatch ? "green" : "red"}}
            >
              <p>
                {match.eventName}
              </p>

              <p>
                {match.eventDetails}
              </p>

              <p>
                {match.eventResult}
              </p>
            </div>
          )
        })
      }


    </div>
  )
}

export default Wrestler;