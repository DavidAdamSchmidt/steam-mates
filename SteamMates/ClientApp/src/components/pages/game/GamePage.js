import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import useRequest from "../../../hooks/useRequest";
import GamePageHeader from "./GamePageHeader";
import Description from "./Description";
import Media from "./Media";
import { API_URL } from "../../../constants/api";

const Container = styled.div`
  margin-top: -70px;
`;

const GamePage = () => {
  const [id, setId] = useState(0);
  const history = useHistory();

  const [loading, status, data, error] = useRequest(
    `${API_URL}/games/${id}`,
    id > 0,
    "GET"
  );

  useEffect(() => {
    const query = new URLSearchParams(history.location.search);
    const param = parseInt(query.get("id"));

    if (isNaN(param)) {
      history.goBack();
    }

    setId(param);
  }, [history]);

  if (loading || !data) {
    return <div>{loading && <span>Loading...</span>}</div>;
  }

  return (
    <Container>
      <GamePageHeader data={data} />
      <Description data={data} />
      <Media data={data} />
    </Container>
  );
};

export default GamePage;
