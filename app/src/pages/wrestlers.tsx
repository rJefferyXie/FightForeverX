"use client"

// React + Next
import ExportedImage from "next-image-export-optimizer";
import { useRouter } from 'next/router';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import WrestlerActions from '@/store/actions/wrestlerActions';

// Constants
import wrestlers from '../constants/wrestlers';

// Interfaces
import Wrestler from '@/interfaces/wrestler';

const Wrestlers = () => {
  const router = useRouter();

  // Redux
  const dispatch = useDispatch();
  const wrestlerState = useSelector((state: any) => state.wrestler);

  const navigate = (wrestler: Wrestler) => {
    dispatch(WrestlerActions.viewWrestler(wrestler));

    const wrestlerName = wrestler.name.toLowerCase().replace(" ", "-");
    router.push("wrestler/" + wrestlerName);
  }

  return (
    <main className="flex flex-wrap content-center justify-center h-full sm:h-screen w-screen bg-zinc-50 sm:ml-20 sm:p-4">
      {wrestlers.map((wrestler, idx) => {
        return (
          <div 
            className={"wrestler " + wrestler.color} 
            onClick={() => navigate(wrestler)}
            key={idx}
          >
            <div className="wrestler-name-container">
              <p className="wrestler-name">{wrestler.name}</p>
              <p className="wrestler-nickname">{wrestler.nickname}</p>
            </div>

            <ExportedImage
              className="wrestler-image"
              src={wrestler.image}
              alt={"An image of " + wrestler.name}
              height={64}
              width={64}
            />
          </div>
        )
      })}
    </main>
  )
}

export default Wrestlers;