import * as React from 'react'
import {Menu, Transition} from '@headlessui/react'
import IconVerticalEllipsis from '../assets/icon-vertical-ellipsis'

export interface IAppProps {}

export function KebabMenu(props: IAppProps) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button className="inline-flex w-full justify-center rounded-md  py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
        <IconVerticalEllipsis width={25} height={25} />
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
        <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <Menu.Item>edit</Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}