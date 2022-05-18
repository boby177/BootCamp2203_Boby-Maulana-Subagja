import React, { Fragment,useEffect, useState } from "react";
import { CardGroup, Row, Col, Container } from "react-bootstrap";
import { Link } from 'react-router-dom'

// Other Components
// import NewsCard2Demo from './components/forum/trendDiscussion1'

// MUI Components
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { CardActionArea } from '@mui/material';

// MUI Icons
import {ExitToApp, ForumOutlined, GamepadOutlined, VideocamTwoTone, SportsSoccerSharp, SportsEsportsRounded, Newspaper, MovieCreationOutlined, Whatshot} from '@mui/icons-material';

// List Images
import img_title from "./img/others/foramu_banner.png";
import img_game from "./img/games/game.jpg";
import img_news from "./img/news/img1.png";
import img_tech from "./img/techs/img1.png";
import img_anime from "./img/anime/anime.jpg";
import img_football from "./img/others/football.jpg";
import img_genshin from "./img/others/genshin.jpg";
import img_op from "./img/others/op.jpg";
import Ads1 from "./img/others/ads1.png"
import Ads2 from "./img/others/ads5.png"
import Ads3 from "./img/others/Screenshot_7.png"
import Ads4 from "./img/others/ads12.png"
import Ads5 from "./img/others/ads13.png"

const Home = ({ setAuth }) => {
  const [name, setName] = useState("");

  const getProfile = async () => {
    try {
      const res = await fetch("http://localhost:3001/dashboard/", {
        method: "POST",
        headers: { jwt_token: localStorage.token }
      });

      const parseData = await res.json();
    //   console.log(parseData)
      setName(parseData.user_name);
    } catch (err) {
      console.error(err.message);
    }
  };

  const logout = async e => {
    e.preventDefault();
    try {
      localStorage.removeItem("token");
      setAuth(false);
      alert("Logout successfully");
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);


  return (
    <Fragment>
      
     {/* <Image style={{position: "absolute", marginLeft: "4%", marginTop: "3%", border:'0'}} src={Ads2}></Image> */}
    {/* <Image style={{position: "absolute", marginLeft: "85%", marginTop: "3%", height: 'auto'}} src={Ads2}></Image>  */}
    {/* <Image style={{position: "absolute", marginLeft: "4%", marginTop: "67%"}} src={Ads4}></Image>
    <Image style={{position: "absolute", marginLeft: "85%", marginTop: "67%"}} src={Ads5}></Image> */}

    <div className="container" style={{ width: "75%", aspectRatio: '100 / 29' }}>
      <br />

      <Card sx={{ maxWidth: 1000 }}>
      <CardMedia
        component="img"
        height="200"
        width="100%"
        border='0'
        image={img_title}
        alt="Foramu"
        // aspectRatio= '100/29'
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" textAlign={'center'}>
          <h2> <ForumOutlined /> FORAMU </h2>
        </Typography>
        <Typography variant="body2" color="text.secondary" textAlign={'justify'}>
              Hi <b> {name}</b> welcome dikomunitas forum<b> foramu</b>, saat ini kita memiliki
              5 kategori forum utama, yaitu forum game, news, technology, anime,
              dan football. Disini kita sharing berbagai hal apapun itu, ohh iya
              khusus diforum ini kita biasa memanggil satu sama lain dengan nama
              <b> foramus</b>, nah jadi tunggu apalagi yuk diskusi bareng dengan foramus yang lainnya.
        </Typography>
      </CardContent>
    </Card>

    <br />
    <Container>
      <Row>
        <Col>
        
    {/* <div style={{float: 'left'}}> */}
    <Card sx={{ maxWidth: 475 }}>
      <CardMedia
        component="img"
        height="200"
        width="100%"
        border='0'
        image={img_game}
        alt="Game forum"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" textAlign={'center'}>
          <h5> <SportsEsportsRounded /> Game Forum </h5>
        </Typography>
        <Typography variant="body2" color="text.secondary" textAlign={'justify'}>
        Foramus yang suka apalagi hoby maen game wajib kunjungin ini forum, disini terdapat beberapa tips 
        atau trick dari setiap game, atau pembahasan karakter game, dll. Yuk intip siapa tau ada game favaorit kalian.
        </Typography>
      </CardContent>
      <CardActions>
          <Button variant="outlined" color="primary" style={{margin: '0 auto', display: "flex"}}>
      <Link to={"/sub_forums/detail/1"} style={{textDecoration: 'none', color: 'inherit'}}>
        Detail
          </Link>
      </Button>
      </CardActions>
    </Card>
    {/* </div> */}
    </Col>
    <Col>
    
    

    {/* <div style={{float: 'right'}}> */}
    <Card sx={{ maxWidth: 450 }}>
      <CardMedia
        component="img"
        height="200"
        width="100%"
        border='0'
        image={img_news}
        alt="News forum"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" textAlign={'center'}>
          <h5> <Newspaper /> News Forum </h5>
        </Typography>
        <Typography variant="body2" color="text.secondary" textAlign={'justify'}>
        Disini terdapat beberapa berita - berita ter update dan menarik untuk dibaca, berita yang disajikan pada forum ini berita internasional maupun lokal. Jika kalian tertarik mari bergabung dan berkontribusi pada forum ini.
        </Typography>
      </CardContent>
      <CardActions>
      <Button variant="outlined" color="primary" style={{margin: '0 auto', display: "flex"}}>
      <Link to={"/sub_forums/detail/3"} style={{textDecoration: 'none', color: 'inherit'}}>
        Detail
          </Link>
      </Button>
      </CardActions>
    </Card>
    </Col>
      </Row>
    </Container>
    
    {/* <Image style={{ width: "1000px", marginTop: "50px"}} src={Ads1}></Image> */}
    <br />
    {/* </div> */}
    
    <br />
    <div style={{ float: "left"}}>
    <Card sx={{ maxWidth: 1000 }}>
      <CardMedia
        component="img"
        height="200"
        width="100%"
        border='0'
        image={img_anime}
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" textAlign={'center'}>
          <h2> <MovieCreationOutlined /> Anime Forum </h2>
        </Typography>
        <Typography variant="body2" color="text.secondary" textAlign={'center'}>
        Disini tempatnya para foramus pecinta anime - anime berkumpul, kalian calon foramus yang suka anime wajib ikutin diforum anime ini, disini kita membahas anime atau pun manga favorit para foramus, selain itu juga terdapat beberapa musik - musik anime yang wajib kalian dengerin, yuk langsung aja kunjungi sekarang juga.
        </Typography>
        <CardActions>
      <Button variant="outlined" color="primary" style={{margin: '0 auto', display: "flex"}}>
      <Link to={"/sub_forums/detail/2"} style={{textDecoration: 'none', color: 'inherit'}}>
        Detail
          </Link>
      </Button>
      </CardActions>
      </CardContent>
      {/* <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions> */}
    </Card>
    <br />
    </div>

    
    <br />
    <Alert icon={false} variant="filled" severity="error" style={{width: '100%'}}>
    <Whatshot /> Trending Forum 
</Alert>
<br />
    {/* <div style={{ float: 'left'}}> */}
<CardGroup>
    {/* <div style={{marginLeft: '0%', float: 'left'}}> */}
    <Card sx={{ maxWidth: 300 }}>
    <CardActionArea>
    <Link to={"/discusions/detail/1"} style={{textDecoration: 'none', color: 'inherit'}}>
      <CardMedia
        component="img"
        height="200"
        width="100%"
        border='0'
        image={img_genshin}
        alt="News forum"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" textAlign={'center'}>
          <h5> <GamepadOutlined /> Genshin Impact Forum </h5>
        </Typography>
        <Typography variant="body2" color="text.secondary" textAlign={'justify'}>
        Foramus yang maen genshin wajib dateng kesini, disini kita bahas setiap karakter dari genshin dan tips trick menarik.
        </Typography>
      </CardContent>
        </Link>
      </CardActionArea>
    </Card>
    {/* </div> */}
    
    {/* <div style={{marginLeft: '34%'}}> */}
    <Card sx={{ maxWidth: 300 }}>
    <CardActionArea>
    <Link to={"/discusions/detail/11"} style={{textDecoration: 'none', color: 'inherit'}}>
      <CardMedia
        component="img"
        height="200"
        width="100%"
        border='0'
        image={img_op}
        alt="News forum"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" textAlign={'center'}>
          <h5> <VideocamTwoTone /> One Piece Forum </h5>
        </Typography>
        <Typography variant="body2" color="text.secondary" textAlign={'justify'}>
        Diforum kita membahas anime ataupun manga one piece, dari alur cerita ataupun random dari apa yang foramus ingin bahas.
        </Typography>
      </CardContent>
      </Link>
      </CardActionArea>
    </Card>
    {/* </div> */}
    
    {/* <div style={{marginLeft: '68%', marginTop: '-34%'}}> */}
    <Card sx={{ maxWidth: 300 }}>
      <CardActionArea>
    <Link to={"/discusions/detail/17"} style={{textDecoration: 'none', color: 'inherit'}}>
      <CardMedia
        component="img"
        height="200"
        width="100%"
        border='0'
        image={img_football}
        alt="News forum"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" textAlign={'center'}>
          <h5> <SportsSoccerSharp /> Football Forum </h5>
        </Typography>
        <Typography variant="body2" color="text.secondary" textAlign={'justify'}>
        Kalian pecinta bola ayo bergabung dengan football forum ini, kita membahas setiap liga - liga yang ada di eropa atau lokal.
        </Typography>
      </CardContent>
      </Link>
      </CardActionArea>
    </Card>
    {/* </div> */}
    </CardGroup>
    
    <br />
    <Alert icon={false} variant="filled" severity="info" style={{width: '100%'}}>
      <ForumOutlined /> Last Discussion 
</Alert>
<br />
<Row xs={1} md={3} className="g-4">
  {Array.from({ length: 6 }).map((_, idx) => (
    <Col>
    <Card sx={{ maxWidth: 320 }}>
      <CardActionArea>
    <Link to={"#"} style={{textDecoration: 'none', color: 'inherit'}}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" textAlign={'center'}>
          <h5> Discussion </h5>
        </Typography>
        <Typography variant="body2" color="text.secondary" textAlign={'center'}>
        ON PROGRESS
        </Typography>
      </CardContent>
      </Link>
      </CardActionArea>
    </Card>
    </Col>
  ))}
  </Row>

    </div>
    <br />
      {/* <center>
      <Button onClick={e => logout(e)} variant="outlined" color="error" float='right'>
        <ExitToApp /> Logout
      </Button>
      </center> */}
    </Fragment>
  );
};

export default Home;
