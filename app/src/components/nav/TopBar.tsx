import {useMediaQuery} from 'react-responsive'
import MenuPopover from './mobile/MenuPopover'

//icons
import IconLogoMobile from '../../assets/logo-mobile'
import KebabMenu from '../KebabMenu'
import IconAddTaskMobile from '../../assets/icon-add-task-mobile'
import {useParams} from 'react-router-dom'

export default function TopBar() {
  const isMobile = useMediaQuery({query: '(max-width: 375px)'})
  const params = useParams()

  return (
    <div className="flex h-16 flex-row items-center justify-center bg-white dark:bg-gray-dark">
      {isMobile ? (
        <div className="flex w-full flex-row content-between items-center justify-between">
          <div className="mr-1 flex flex-row items-center justify-start">
            <IconLogoMobile width={30} height={30} />
            <MenuPopover />
          </div>
          {params.boardId && (
            <div className=" flex flex-row items-center justify-center gap-2">
              <button className="flex h-8 w-12 items-center justify-center rounded-full bg-purple-primary">
                <IconAddTaskMobile height={25} width={25} />
              </button>
              <KebabMenu />
            </div>
          )}
        </div>
      ) : (
        <>
          <h1>Board name</h1>
          <h1>add task</h1>
          <h1>meatBalls</h1>
        </>
      )}
    </div>
  )
}
