import { Navigate, Route } from "react-router-dom"
import { Routes } from "react-router-dom"
import routes from "../../core/routes"
import HomePage from "../pages/HomePage"
import CallbackRouter from "./CallbackRouter"
import OnBoardingPage from "../pages/OnBoardingPage"
import ConsolePage from "../pages/ConsolePage"
import InstancePage from "../pages/InstancePage"
import StatusSummaryPage from "../pages/StatusSummaryPage"
import AddInstancePage from "../pages/AddInstancePage"
import ErrorPageContainer from "../pages/ErrorPageContainer"
import SetUpWizardPage from "../pages/SetUpWizardPage"

const AppRouter = () => {
    return (
        <Routes>
            <Route path={routes.home.url} element={<HomePage />} />
            <Route path={routes.authCallback.url} element={<CallbackRouter />} />
            <Route path='/' element={<Navigate to={routes.home.url} replace={true} />} />
            <Route path={routes.onBoardingWizard.url} element={<OnBoardingPage />} />
            <Route path={`${routes.setUpWizard.url}/:year`} element={<SetUpWizardPage />} />
            <Route path={routes.stateSummary.url} element={<StatusSummaryPage />} />
            <Route path={routes.console.url} element={<ConsolePage />} />
            <Route path={routes.addInstance.url} element={<AddInstancePage />} />
            <Route path={routes.instance.url} element={<InstancePage />} />
            <Route path={routes.notFound.url} element={<ErrorPageContainer status="404" />} />
            <Route path={routes.unauthorized.url} element={<ErrorPageContainer status="403" />} />
            <Route path={routes.internalError.url} element={<ErrorPageContainer status="500" />} />
            <Route path='*' element={<Navigate to={routes.notFound.url} replace={true} />} />
        </Routes>
    )
}

export default AppRouter