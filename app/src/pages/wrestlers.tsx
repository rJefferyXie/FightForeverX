// Styles
import '../app/globals.scss';

// React + Next
import ExportedImage from "next-image-export-optimizer";
import MainLayout from './layout';

// Constants
import wrestlers from '../constants/wrestlers';

const Wrestlers = () => {
  return (
    <MainLayout>
      <main className="flex flex-wrap content-center justify-center h-full sm:h-screen w-screen bg-zinc-50 sm:ml-20 sm:p-4">
        {wrestlers.map((wrestler, idx) => {
          return (
            <div className={"wrestler " + wrestler.color} key={idx}>
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
    </MainLayout>
  )
}

export default Wrestlers;