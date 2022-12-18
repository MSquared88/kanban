import * as React from 'react'
import {NavLink, useSearchParams} from 'react-router-dom'
import IconBoard from '../../assets/icon-board'

import BoardIcon from '../../assets/icon-board'

import type {Board} from '../../types'
interface IAppProps {
  boards: Board[] | []
  close: (
    focusableElement?:
      | HTMLElement
      | React.MutableRefObject<HTMLElement | null>
      | React.MouseEvent<HTMLElement, MouseEvent>
      | undefined,
  ) => void
}
const BoardNav: React.FunctionComponent<IAppProps> = ({boards, close}) => {
  const [searchParams, setSearchParams] = useSearchParams()

  return (
    <div className="flex flex-col font-semibold">
      <p className="pl-6 pb-3 text-gray-medium">{`ALL BOARDS (${boards?.length})`}</p>
      <div className="h-36  overflow-y-scroll">
        {boards
          ? boards.map(board => (
              <NavLink
                key={board.id}
                to={`board/${board.id}`}
                className={({isActive}) =>
                  `flex h-12 w-60 flex-row items-center justify-start rounded-r-3xl hover:bg-white hover:text-purple-primary ${
                    isActive
                      ? 'bg-purple-primary text-white'
                      : 'text-gray-medium'
                  }`
                }
                onClick={close}
              >
                {({isActive}) => (
                  <div className="flex items-center justify-center pl-6 ">
                    <BoardIcon
                      width={16}
                      height={16}
                      fill={isActive ? 'white' : '#828FA3'}
                    />

                    <p className="pl-4">{board.name}</p>
                  </div>
                )}
              </NavLink>
            ))
          : null}
      </div>
      <button
        className="flex h-12 w-60 flex-row items-center justify-start pl-6"
        onClick={() => setSearchParams({add_board: 'true'})}
      >
        <IconBoard width={16} height={16} fill="#635FC7" />{' '}
        <p className="pl-4 text-purple-primary">+ Create New Board</p>
      </button>
    </div>
  )
}
export default BoardNav
