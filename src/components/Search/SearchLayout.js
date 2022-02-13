import styled from 'styled-components';

const Container = styled.main`
  padding: 50px 90px;
  min-height: 100vh;
  background-color: #e5e5e5;
  color: #000000;
`;

const Input = styled.input`
  margin-bottom: 41px;
  padding: 0 20px;
  width: 100%;
  max-width: 620px;
  height: 50px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 50px;
  font: inherit;
  color: #333333;
  outline: none;
`;

const Grid = styled.div`
  --columns: 1;
  margin-bottom: 70px;
  display: grid;
  grid-gap: 30px 0;
  grid-template-columns: repeat(var(--columns), minmax(0, 1fr));

  @media only screen and (min-width: 768px) {
    --columns: 2;
    grid-gap: 25px;
  }

  @media only screen and (min-width: 1024px) {
    --columns: 3;
  }

  @media only screen and (min-width: 1200px) {
    --columns: 4;
  }
`;

const Card = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 10px;
  min-height: 250px;
  background-color: #ffffff;
  color: #000000;
`;

const H2 = styled.h2`
  margin: 0 0 30px;
  padding-bottom: 15px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  font-size: 25px;
`;

const H3 = styled.h3`
  margin: 0;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Button = styled.button`
  margin-top: 20px;
  padding: 15px 20px;
  border-radius: 100px;
  background-color: #0a3b85;
  color: #ffffff;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.07em;
`;

const SearchLayout = ({ results, handleChange, loadMoreResults }) => {
  const getTotalResults = () => {
    let total = 0;
    let resultCount = 0;

    Object.entries(results).forEach(([_, value]) => {
      total = total + value.nbHits;
      resultCount = resultCount + value.hits.length;
    });

    return `You’ve viewed ${resultCount} of ${total} results`;
  };

  return (
    <Container>
      <Input onChange={(e) => handleChange(e)} />

      <H2>Courses</H2>
      <Grid>
        {results.courses.hits?.map(({ id, title, sectionName }) => (
          <Card key={id}>
            <H3>{title}</H3>
            <p>{sectionName}</p>
          </Card>
        ))}
      </Grid>

      <H2>Events</H2>
      <Grid>
        {results.events.hits?.map(({ id, title, sectionName }) => (
          <Card key={id}>
            <H3>{title}</H3>
            <p>{sectionName}</p>
          </Card>
        ))}
      </Grid>

      <H2>News</H2>
      <Grid>
        {results.news.hits?.map(({ id, title, sectionName }) => (
          <Card key={id}>
            <H3>{title}</H3>
            <p>{sectionName}</p>
          </Card>
        ))}
      </Grid>

      <ButtonContainer>
        <p>{getTotalResults()}</p>
        <Button onClick={loadMoreResults}>Load more</Button>
      </ButtonContainer>
    </Container>
  );
};

export default SearchLayout;
