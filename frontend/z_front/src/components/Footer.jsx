import React from 'react'

const Footer = () => {
  return (
    <div>
      <footer class="bg-dark text-white text-center">
        <div class="container py-4">
            <div class="row">
                <div class="col-md-4">
                    <h2>Contact Us</h2>
                    <h6>123 Main Street, City</h6>
                    <h6>Email: contact@zomato.com</h6>
                    <h6>Phone: +123 456 7890</h6>
                </div>
                <div class="col-md-4">
                    <h2>Explore</h2>
                    <ul class="list-unstyled">
                        <li><a className='footer_links' href="#">About Us</a></li>
                        <li><a className='footer_links' href="#">Careers</a></li>
                        <li><a className='footer_links' href="#">Blog</a></li>
                        <li><a className='footer_links' href="#">FAQs</a></li>
                    </ul>
                </div>
                <div class="col-md-4">
                    <h4>Follow Us</h4>
                    <a href="#" class="btn btn-outline-light btn-social">
                        <i class="fab fa-facebook-f"></i>
                    </a>
                    <a href="#" class="btn btn-outline-light btn-social">
                        <i class="fab fa-twitter"></i>
                    </a>
                    <a href="#" class="btn btn-outline-light btn-social">
                        <i class="fab fa-instagram"></i>
                    </a>
                    <a href="#" class="btn btn-outline-light btn-social">
                        <i class="fab fa-linkedin-in"></i>
                    </a>
                </div>
            </div>
        </div>
        <div class="bg-primary py-2">
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <p class="text-center mb-0">&copy; 2023 Zomato. All Rights Reserved.</p>
                    </div>
                </div>
            </div>
        </div>
    </footer>
      
    </div>
  )
}

export default Footer
