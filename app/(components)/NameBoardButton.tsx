import React, { Suspense } from "react"

const NameBoardButton = ({
  data,
  createTrelloBoard,
}: {
  data: string
  createTrelloBoard: (data: string) => void
}) => {
  return (
    <div className={"flex flex-col justify-center items-center"}>
      <button className={"mt-4 btn"} onClick={() => createTrelloBoard(data)}>
        <Suspense
          fallback={
            <div className="flex justify-center items-center">
              <div
                className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"
                role="status"
              >
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          }
        >
          {data}
        </Suspense>
      </button>
    </div>
  )
}

export default NameBoardButton
