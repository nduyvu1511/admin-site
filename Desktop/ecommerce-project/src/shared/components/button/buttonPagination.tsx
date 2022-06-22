import { HiArrowSmLeft, HiArrowSmRight } from "react-icons/hi"

interface PaginationProps {
  onPaginate: Function
  currentOffset: number
  totalPage: number
}

const Button = ({
  active,
  index,
  onClick,
}: {
  active?: boolean
  index: number
  onClick: (offset: number) => void
}) => (
  <button
    className={`btn-reset pagination-btn ${
      active ? "pagination-btn-active" : ""
    } `}
    onClick={() => {
      onClick(index)
    }}
  >
    {index + 1}
  </button>
)

export const Pagination = ({
  totalPage,
  currentOffset,
  onPaginate,
}: PaginationProps) => {
  const paginations = Array.from({ length: totalPage })

  return (
    <div className="pagination">
      {currentOffset > 0 ? (
        <button
          onClick={() => {
            onPaginate(currentOffset - 1)
          }}
          className={`btn-reset pagination-btn ${
            currentOffset + 1 === 1 ? "pagination-btn-disable" : ""
          }`}
        >
          <HiArrowSmLeft />
        </button>
      ) : null}

      {paginations?.length <= 5 ? (
        <>
          {paginations.map((_, index) => (
            <Button
              index={index}
              active={currentOffset === index}
              onClick={() => onPaginate(index)}
              key={index}
            />
          ))}
        </>
      ) : (
        <>
          <Button
            index={0}
            onClick={() => onPaginate(0)}
            active={currentOffset === 0}
            key={0}
          />

          {currentOffset < 4 ? (
            paginations.map(
              (_, index) =>
                index > 0 &&
                index < 5 && (
                  <Button
                    index={index}
                    active={currentOffset === index}
                    onClick={() => onPaginate(index)}
                    key={index}
                  />
                )
            )
          ) : (
            <>
              <span className="pagination-dots">...</span>
              {/* <Button
                index={currentOffset - 2}
                onClick={() => onPaginate(currentOffset - 2)}
              /> */}

              <Button
                index={currentOffset - 1}
                onClick={() => onPaginate(currentOffset - 1)}
              />

              <Button
                index={currentOffset}
                active={true}
                onClick={() => onPaginate(currentOffset)}
              />

              {currentOffset + 1 < totalPage ? (
                <Button
                  index={currentOffset + 1}
                  onClick={() => onPaginate(currentOffset + 1)}
                />
              ) : null}

              {/* {currentOffset + 2 < totalPage ? (
                <Button
                  index={currentOffset + 2}
                  onClick={() => onPaginate(currentOffset + 2)}
                />
              ) : null} */}
            </>
          )}

          {currentOffset + 2 < totalPage ? (
            <span className="pagination-dots">...</span>
          ) : null}
        </>
      )}

      {currentOffset + 1 < totalPage ? (
        <button
          onClick={() => {
            onPaginate(currentOffset + 1)
          }}
          className={`btn-reset pagination-btn ${
            currentOffset + 1 === totalPage ? "pagination-btn-disable" : ""
          }`}
        >
          <HiArrowSmRight />
        </button>
      ) : null}
    </div>
  )
}
