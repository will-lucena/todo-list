/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(faArrowRightFromBracket)


const componentName = 'font-awesome-icon'

export { FontAwesomeIcon as component, componentName }

