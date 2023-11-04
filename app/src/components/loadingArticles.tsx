// Styles
import '../styles/loadingArticles.scss';

// MUI
import { Skeleton } from "@mui/material";

const LoadingArticles = () => {
  return (
    <div className="flex flex-col w-full">
      <p
        className="my-2 mx-auto"
      >
        Loading Articles...
      </p>

      <div className="flex flex-wrap w-full justify-center">
        {[...Array(15)].map(() => {
          return (
            <div
              className="skeleton-container flex flex-col relative rounded-md overflow-hidden"
            >
              <Skeleton
                variant="rounded"
                className="absolute skeleton-background"
              />

              <div className="bg-neutral-300 p-2 w-full mt-auto mx-auto">
                {[...Array(2)].map(() => {
                  return (
                    <Skeleton 
                      variant="text"
                      className="skeleton-text"
                    />
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>


    </div>
  )
}

export default LoadingArticles;