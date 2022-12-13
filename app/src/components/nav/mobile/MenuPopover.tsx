import * as React from 'react'

//router
import {useParams} from 'react-router-dom'

//types
import {Board} from '../../../types'

//components
import {Popover, Transition} from '@headlessui/react'
import IconChevronDown from '../../../assets/icon-chevron-down'
import IconChevronUp from '../../../assets/icon-chevron-up'
import ThemePicker from '../ThemePicker'
import {LogoutButton} from '../../LogOutButton'
import BoardNav from '../BoardNav'

//hooks
import {useBoardsQuery} from '../../../utils/hooks'

export default function MenuPopover() {
  const {boardId} = useParams()
  const boards = useBoardsQuery() || []

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
                group inline-flex items-center rounded-md  px-3 py-2 text-base font-medium text-white hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
            >
              <span className="text-black dark:text-white">
                {board?.name ?? 'Select Board'}
              </span>

              {open ? (
                <IconChevronDown width={15} height={15} />
              ) : (
                <IconChevronUp width={15} height={15} />
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
              <Popover.Panel className="absolute left-1/2 z-10 mt-10  -translate-x-1/2 transform ">
                <div className="  overflow-hidden  bg-white py-3 pr-3 shadow-lg  ring-1  ring-black  ring-opacity-5 dark:bg-gray-dark dark:text-white">
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
