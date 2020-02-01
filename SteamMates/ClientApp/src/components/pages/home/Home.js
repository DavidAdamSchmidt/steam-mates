import React, { useContext } from "react";
import UserContext from "../../../contexts/UserContext";
import { showError } from "../../../utils/errorUtils";

const Home = () => {
  const { status, error } = useContext(UserContext);

  if (status === 503 && (error || {}).apiName === "Steam") {
    return showError(error.message);
  }

  return (
    <div>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris placerat
      laoreet leo, sed tincidunt ex posuere eu. Suspendisse venenatis, velit at
      lacinia sagittis, arcu quam fermentum eros, ac tincidunt erat turpis non
      tellus. Donec porttitor orci rhoncus, interdum lorem quis, laoreet nisi.
      Donec pretium turpis at orci viverra blandit. Etiam eleifend volutpat
      quam, a facilisis risus congue in. Cras efficitur urna mi, at consequat
      felis eleifend quis. Etiam tempus suscipit neque, et tempus dolor
      tristique sed.
    </div>
  );
};

export default Home;
