import { Route,Redirect } from "react-router-dom";
import { isAutheticated } from ".";

const PrivateRoute = ({ component: Component, ...rest }) => {

    return (
      <Route
        {...rest}
        render={ props =>
          isAutheticated() ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/signin",
                state: { from: props.location }
              }}
            />
          )
        }
      />
    );
  }
  

  export default PrivateRoute