import {
  Navigate, Route,
  Routes
} from 'react-router-dom'
import routes from '../../core/routes'
import AddInstancePage from '../pages/AddInstancePage'
import ConsolePage from '../pages/ConsolePage'
import ErrorPageContainer from '../pages/ErrorPageContainer'
import HomePage from '../pages/HomePage'
import InstancePage from '../pages/InstancePage'
import StatusSummaryPage from '../pages/StatusSummaryPage'
import CallbackRouter from './CallbackRouter'
import { markdownRoutes } from './MarkdownFilesRoutes'


const AppRouter = () => {
  return (
    <Routes>
      <Route
        element={<HomePage />}
        path={routes.home.url}
      />

      <Route
        element={<CallbackRouter />}
        path={routes.authCallback.url}
      />

      <Route
        element={<Navigate
          replace={true}
          to={routes.home.url}
        />}
        path='/'
      />

      {/* <Route
        element={<OnBoardingPage />}
        path={routes.onBoardingWizard.url}
      /> */}

      {/* <Route
        element={<SetUpWizardPage />}
        path={`${routes.setUpWizard.url}/:year`}
      /> */}

      <Route
        element={<StatusSummaryPage />}
        path={routes.stateSummary.url}
      />

      <Route
        element={<ConsolePage />}
        path={routes.console.url}
      />

      <Route
        element={<AddInstancePage />}
        path={routes.addInstance.url}
      />

      <Route
        element={<InstancePage />}
        path={routes.instance.url}
      />

      <Route
        element={<ErrorPageContainer status="404" />}
        path={routes.notFound.url}
      />

      <Route
        element={<ErrorPageContainer status="403" />}
        path={routes.unauthorized.url}
      />

      <Route
        element={<ErrorPageContainer status="500" />}
        path={routes.internalError.url}
      />

      {
        /* Auto-Generated Markdown Files */
        markdownRoutes.map(({ path, component: Component }) => {
          return <Route
            key={`docs-${path}`}
            element={<Component />}
            path={`${path}`}
          />
        })
      }

      <Route
        element={<Navigate
          replace={true}
          to={routes.notFound.url}
        />}
        path='*'
      />
    </Routes>
  )
}

export default AppRouter