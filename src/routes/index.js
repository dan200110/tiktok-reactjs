import routeConfig from '~/config/routes'
import { HeaderOnly } from "~/components/Layout"

import Home from "~/page/Home"
import Following from "~/page/Following"
import Profile from "~/page/Profile"
import Upload from "~/page/Upload"

const publicRoutes = [
    { path: routeConfig.home, component: Home },
    { path: routeConfig.following, component: Following },
    { path: routeConfig.profile, component: Profile },
    { path: routeConfig.upload, component: Upload, layout: HeaderOnly },
]

const privateRoutes = []

export { publicRoutes, privateRoutes }