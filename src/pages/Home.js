import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Country from '../components/Country';
import { retrieveCountries } from '../redux/Home/home';

function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(retrieveCountries());
  }, [dispatch]);
  const countries = useSelector((state) => state.countriesReducer);

  const [search, setSearch] = React.useState('');

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const renderCountries = countries.filter(
    (country) => country.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <>
      <div className="search-holder">
        <input type="text" className="search-bar" placeholder="Search by name" onChange={handleChange} />
      </div>
      <div className="heading-content">
        <img
          src="https://www.transparentpng.com/thumb/world/flat-texture-blue-green-world-transparent-background-3xppkK.png"
          alt="flat texture blue green World transparent background @transparentpng.com"
          className="world-image"
        />
        <h2>
          Number of Countries:
          {' '}
          <br />
          <span className="countries-num">235</span>
        </h2>
      </div>
      <div className="contents">
        {renderCountries.map((country) => (
          <Link
            className="details-link"
            to={{
              pathname: `/country/${country.name}`,
              state: { stateParam: true },
            }}
            key={country.id}
          >
            <Country
              key={country.id}
              id={country.id}
              name={country.name}
              population={country.population}
              flag={country.flag}
              capital={country.capital}
              region={country.region}
              subregion={country.subregion}
              area={country.area}
              timezones={country.timezones}
              callingcode={country.callingcode}
              alphacode={country.alphacode}
            />
          </Link>
        ))}
      </div>
    </>
  );
}

export default Home;
