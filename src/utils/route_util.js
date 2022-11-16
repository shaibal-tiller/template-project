import Home from "../components/Home/index"
import Projects from '../components/Projects/index'
const createRoute = (path, Element) => {
    return { path: path, element: Element }
}

export const routes = [
    createRoute('/', <Home />),
    createRoute('/:id' ,<Projects/>)
   
]