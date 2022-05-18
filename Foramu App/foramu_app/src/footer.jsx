import React, { Fragment } from "react";
import FacebookTwoToneIcon from '@mui/icons-material/FacebookTwoTone';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import GitHubIcon from '@mui/icons-material/GitHub';

const Footer = () => {
    return (
      // <!-- Site footer -->
      <Fragment>
      <footer class="site-footer">
        <div class="container">
      <hr />
          <div class="row">
            <div class="col-sm-12 col-md-6">
              <h6>About</h6>
              <p class="text-justify">Foramu is application final project for WGS Bootcamp Batch 1 exam, this app using PERN stack method which is Postgresql, Express, React, and Node. Let's join to foramu and become to be foramus family.</p>
            </div>
  
            <div class="col-xs-6 col-md-3">
              <h6>Social</h6>
              <ul class="footer-links">
                <li><a href="/profile" style={{textDecoration: 'none'}}>My Profile</a></li>
                <li><a href="/users" style={{textDecoration: 'none'}}>Users</a></li>
              </ul>
            </div>
  
            <div class="col-xs-6 col-md-3">
              <h6>Contact Us</h6>
              <ul class="footer-links">
                <li><a href="#" style={{textDecoration: 'none'}}>Email</a></li>
                <li><a href="#" style={{textDecoration: 'none'}}>Phone Number</a></li>
                {/* <li><a href="/sub_forums/detail/3">News Forum</a></li>
                <li><a href="/sub_forums/detail/1">Games Forum</a></li> */}
              </ul>
            </div>
          </div>
          <hr />
        </div>
        <div class="container">
          <div class="row">
            <div class="col-md-8 col-sm-6 col-xs-12">
              <p class="copyright-text">Copyright &copy; 2022 All Rights Reserved by 
           <b> Foramu.</b>
              </p>
            </div>
            <div class="col-md-4 col-sm-6 col-xs-12">
            <ul class="social-icons">
              <li><a class="facebook" href="#"><i class="fa fa-facebook"> <FacebookTwoToneIcon /> </i></a></li>
              <li><a class="twitter" href="#"><i class="fa fa-twitter"> <TwitterIcon /></i></a></li>
              <li><a class="dribbble" href="#"><i class="fa fa-dribbble"> <InstagramIcon /></i></a></li>
              <li><a class="linkedin" href="#"><i class="fa fa-linkedin"> <GitHubIcon /></i></a></li>   
            </ul>
          </div>
          </div>
        </div>
  </footer>
  </Fragment>
    )
}

export default Footer;