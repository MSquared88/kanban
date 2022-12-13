import * as React from 'react'

//router
import {useParams} from 'react-router-dom'

//types
import {Board} from '../../../types'

//components
import {Popover, Transition} from '@headlessui/react'
import ThemePicker from '../ThemePicker'
import {LogoutButton} from '../../LogOutButton'
import BoardNav from '../BoardNav'

//assets
import IconChevronDown from '../../../assets/icon-chevron-down'
import IconChevronUp from '../../../assets/icon-chevron-up'

//hooks
import {useBoardsQuery} from '../../../utils/hooks'

export default function MenuPopover() {
  const {boardId} = useParams()
  const boards = useBoardsQuery() || []

  //get the board that matches the boardId param
  const board: Board | undefined = boardId
    ? boards?.find(({id}) => id === boardId)
    : undefined

  return (
    <div className=" w-full max-w-sm">
      <Popover className="relative">
        {({open, close}) => (
          <>
            <Popover.Button
              className={`
                ${open ? '' : 'text-opacity-90'}
                 group inline-flex grow items-center rounded-md  text-base font-medium text-white  hover:text-opacity-100 focus:outline-none  `}
            >
              <p className="mx-2 h-full text-center align-text-top text-2xl text-black dark:text-white">
                {board?.name ?? 'Select Board'}
              </p>

              {/*if the popover is open, show the up chevron, otherwise show the down chevron*/}
              {open ? (
                <IconChevronDown width={15} height={15} />
              ) : (
                <div className="text-center">
                  <IconChevronUp width={15} height={15} className={''} />
                </div>
              )}
            </Popover.Button>
            <Transition
              as={React.Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute left-1/2 z-10  mt-10  -translate-x-1/2 transform ">
                <div className="  h-96  overflow-hidden bg-white py-3 pr-3 shadow-lg  ring-1  ring-black  ring-opacity-5 dark:bg-gray-dark dark:text-white">
                  <div className="relative flex flex-col items-center justify-center">
                    <BoardNav boards={boards} close={close} />
                    <ThemePicker />
                    <LogoutButton />
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  )
}
