import {Popover, Transition} from '@headlessui/react'
import IconChevronDown from '../../assets/icon-chevron-down.svg'
import {Fragment} from 'react'
import ThemePicker from '../ThemePicker'
import {LogoutButton} from '../LogOutButton'
import {
  Link,
  NavLink,
  useLocation,
  useParams,
  useSearchParams,
} from 'react-router-dom'
import {useAuth0} from '@auth0/auth0-react'
import AddBoard from '../AddBoard'
import {client} from '../../utils/api'
import {Board} from '../../types'
import {useQuery, UseQueryResult} from '@tanstack/react-query'
import {useBoardsQuery} from '../../utils/hooks'

export default function MenuPopover() {
  const [searchParams, setSearchParams] = useSearchParams()
  const {boardId} = useParams()
  const boards = useBoardsQuery()

  const board: Board | undefined = boardId
    ? boards?.find(({id}) => id === boardId)
    : undefined

  return (
    <div className=" top-16 w-full max-w-sm ">
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
              <img src={IconChevronDown} alt="" />
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute left-1/2 z-10 mt-3 w-screen max-w-sm -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-3xl">
                <div className="overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 dark:bg-gray-dark dark:text-white">
                  <div className="flex flex-col">
                    <span>{`all boards (${boards?.length || '0'})`}</span>
                    {boards
                      ? boards.map(board => (
                          <NavLink
                            key={board.id}
                            to={`board/${board.id}`}
                            className={({isActive}) =>
                              isActive ? 'bg-purple-primary' : undefined
                            }
                            onClick={close}
                          >
                            {board.name}
                          </NavLink>
                        ))
                      : null}
                  </div>
                  <button onClick={() => setSearchParams({add_board: 'true'})}>
                    add board
                  </button>
                  <ThemePicker />
                  <LogoutButton />
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  )
}
