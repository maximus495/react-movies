import axios from "axios";
import { memo, useEffect, useState, useRef } from "react";
// import { useSelector } from "react-redux";
// import { RootState } from "~/redux/store/store";
import Authtemplate from "~/templates/AuthTemplate/Authtemplate";
import "./Dashboard.css";
import groupfooter from "../../../assets/footergroup.png";
import backgroundfooter from "../../../assets/footer-font.png"
import { useLocation, useNavigate } from 'react-router-dom';

interface ApiResponse {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: Array<any>; // Aquí debes utilizar el tipo adecuado para "results"
  total_pages: number;
  total_results: number;
}

interface MovieInfoState {
  [id: number]: boolean;
}

const Dashboard = memo(() => {
  // const { Email } = useSelector((state:RootState)=>state.login)
  const prevArrowRef = useRef<HTMLDivElement>(null);
  const nextArrowRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const [images, setImages] = useState<ApiResponse>({
    dates: {
      maximum: '',
      minimum: '',
    },
    page: 1,
    results: [],
    total_pages: 1,
    total_results: 0,
  });
  const [activeButton, setActiveButton] = useState(1);
  const [currentPage, setCurrentPage] = useState(images.page);
  const [movieType, setMovieType] = useState("now_playing");
  const [showInfo, setShowInfo] = useState<MovieInfoState>({});
  const [genres, setGenres] = useState([]);

  const fetchGenres = async () => {
    const options = {
      method: "GET",
      url: `https://api.themoviedb.org/3/genre/movie/list`,
      headers: {
        accept: "application/json",
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4OTExY2U2ZTBjNGUxZjQ4M2E3NDIxMDNjMDJmYjZmOSIsInN1YiI6IjY0MTM3ZDEyYTZjMTA0MDA3OTA3MTM2YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IhXW1F90EvMAP_AMkFrEfMJdyuswuVnBY6_KlyVMkO0`
      },
    };

    axios
      .request(options)
      .then(function (response) {
        const newGenres = response.data.genres
        setGenres(newGenres);
        
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  const getApiMovies = async ( page: number, type: string ) => {
    const options = {
      method: "GET",
      url: `https://api.themoviedb.org/3/movie/${type}?language=en-US&page=${page}`,
      headers: {
        accept: "application/json",
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4OTExY2U2ZTBjNGUxZjQ4M2E3NDIxMDNjMDJmYjZmOSIsInN1YiI6IjY0MTM3ZDEyYTZjMTA0MDA3OTA3MTM2YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IhXW1F90EvMAP_AMkFrEfMJdyuswuVnBY6_KlyVMkO0`
      },
    };

    axios
      .request(options)
      .then(function (response) {
        const newImages = response.data
        setImages(newImages);
        
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  const handleButtonClick = async (buttonNumber: number, type: string) => {
    setActiveButton(buttonNumber);
    setMovieType(type);
    setCurrentPage(1)
    await getApiMovies(1, type);
  };

  const handlePrevClick = async () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      
      if (prevArrowRef.current) {
        if (currentPage -1 == 1) {
          prevArrowRef.current.classList.add('button-arrow-disable'); // Agregar la clase 'miclase'
        } else {
          prevArrowRef.current.classList.remove('button-arrow-disable'); // Eliminar la clase 'miclase'
          if (nextArrowRef.current) {
            nextArrowRef.current.classList.remove('button-arrow-disable'); 
          }
        }
      }

      await getApiMovies(currentPage - 1, movieType)
    }
  };

  const handleNextClick = async () => {
    if (currentPage < images.total_pages) {
      setCurrentPage(currentPage + 1);


      console.log(currentPage )

      if (nextArrowRef.current) {
        if (currentPage + 1 == images.total_pages) {
          nextArrowRef.current.classList.add('button-arrow-disable'); // Agregar la clase 'miclase'
        } else {
          nextArrowRef.current.classList.remove('button-arrow-disable'); // Eliminar la clase 'miclase'
          if (prevArrowRef.current) {
            prevArrowRef.current.classList.remove('button-arrow-disable'); 
          }
        }
      }
      
      await getApiMovies(currentPage + 1, movieType)
    }
  };

  const handleMouseEnter = (id: number) => {
    setShowInfo((prevState) => ({ ...prevState, [id]: true }));
  };

  const handleMouseLeave = (id: number) => {
    setShowInfo((prevState) => ({ ...prevState, [id]: false }));
  };

  useEffect( ()=> {

    const { state } = location;
    if (!state || !state.token || !state.username || !state.expires_at) {
      // Si falta algún dato en el estado, redirigir al login
      navigate('/');
    }

    if (prevArrowRef.current) {
      if (currentPage == 1) {
        prevArrowRef.current.classList.add('button-arrow-disable'); // Agregar la clase 'miclase'
      } else {
        prevArrowRef.current.classList.remove('button-arrow-disable'); // Eliminar la clase 'miclase'
      }
    }

    getApiMovies(1, movieType)

  }, [location, navigate] )

  useEffect(() => {
    fetchGenres();
  }, []);

  return (
    <Authtemplate title="dashboard">

      <div className="principal-body">

        <div className="div-buttons" > 
          <button className={activeButton === 1 ? 'active-button' : 'top-buttons'}
          onClick={() => handleButtonClick(1,'now_playing')}>Now playing</button>
          <button className={activeButton === 2 ? 'active-button' : 'top-buttons'}
          onClick={() => handleButtonClick(2,'popular')}>Popular</button> 
          <button className={activeButton === 3 ? 'active-button' : 'top-buttons'}
          onClick={() => handleButtonClick(3, 'top_rated')}>Top rated</button>
          <button className={activeButton === 4 ? 'active-button' : 'top-buttons'}
          onClick={() => handleButtonClick(4, 'upcoming')}>upcoming</button>
        </div>

        <h1 className="title-category">{movieType}</h1>
        
        <div className="div-images">
        {images.results.map(({ id, poster_path, title, overview, genre_ids, release_date, vote_average }) => {

          const maxOverviewLength = 150;
          const truncatedOverview = overview.length > maxOverviewLength ? `${overview.substring(0, maxOverviewLength)}...` : overview;
          const genreNames = genre_ids.map((genreId: any) => {
            const genre: any = genres.find((genre: { id: any; }) => genre.id === genreId);
            return genre ? genre.name : 'Unknown Genre';
          });

          return (
            <div
              key={id}
              className="movie-item"
              onMouseEnter={() => handleMouseEnter(id)}
              onMouseLeave={() => handleMouseLeave(id)}
            >
              <img
                className="image-movies"
                key={id}
                src={`https://image.tmdb.org/t/p/w1280${poster_path}`}
                alt="Foto"
              />

              {showInfo[id] && (
                <div className="movie-info">
                  <h3>{title}</h3>
                  <p>Genres: {genreNames.join(', ')} /Lanzamiento: {release_date}</p>
                  <p>{truncatedOverview}</p>
                  <p>Popularidad: {vote_average} </p>
                </div>
              )}
            </div>
          );
        })}
        </div>
        <div className="div-arrow">
          <div id="prevArrow" ref={prevArrowRef} className="button-arrow" onClick={ handlePrevClick }>
            <span className="material-symbols-outlined" >
              arrow_back_ios
            </span>
          </div>
          <span>{ images.page } / { images.total_pages }</span>
          <div id="nextArrow" ref={nextArrowRef} className="button-arrow" onClick={ handleNextClick }>
            <span className="material-symbols-outlined" >
              arrow_forward_ios
            </span>
          </div>
        </div>
      </div>

      <div className="div-footer" style={{ backgroundImage: `url(${backgroundfooter})`, backgroundSize: 'cover' }}>
        <h1>We are coding the world of tomorrow_</h1>
        <p className="texto-footer">
          DaCodes es una de las mejores empresas de desarrollo de software en México y LATAM. Lo que nos separa de los demás 
          es el nivel de involucramiento que tenemos en nuestros proyectos y la pasión que tenemos por desarrollar productos 
          digitales de calidad mundial. Somos un equipo de 220+ dacoders especializados en la planeación, diseño, desarrollo, 
          implementación e innovación continua de productos digitales disruptivos.
        </p>
        <img src={groupfooter} alt="Foto-footer" />
      </div>

    </Authtemplate>
  );
});
Dashboard.displayName = "Dashboard";
export default Dashboard;
