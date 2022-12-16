import * as React from 'react'
import {Menu, Transition} from '@headlessui/react'
import IconVerticalEllipsis from '../assets/icon-vertical-ellipsis'
import {useParams, Link, useSearchParams} from 'react-router-dom'
import {useBoardDetail} from '../utils/hooks/hooks.board'
import DestroyBoardModal from './nav/DestroyBoardModal'
import {Board} from '../types'

export default function KebabMenu() {
  const params = useParams()
  const [searhParams, setSearchParams] = useSearchParams()
  const {data: board, isSuccess} = useBoardDetail(params.boardId as string)

  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button className="mr-4 inline-flex  justify-center  rounded-md py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
        <IconVerticalEllipsis width={15} height={20} />
      </Menu.Button>
      <Transition
        as={React.Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 mr-4 flex w-52 origin-top-right flex-col items-start rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-darkest">
          <Menu.Item>
            <button className="w-full p-2 text-left text-gray-medium">{`Edit Board`}</button>
          </Menu.Item>
          <Menu.Item>
            <button
              className="w-full p-2 text-left text-red-primary"
              onClick={() => setSearchParams({destroy_board: 'true'})}
            >
              Delete Board
            </button>
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
