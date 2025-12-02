function Footer() {
    return (
<footer class="footer">
  <div class="footer-container">

    <div class="footer-section about" style={{textAlign:"right"}}>
      <h3 style={{textAlign:"right" ,marginBottom:"10px",color:"white"}}class="">تدريبي </h3>
      <p style={{marginBottom:"10px", }}>
        منصة رقمية تربط طلاب الجامعات في غزة بالشركات التي تقدم فرص التدريب والتطوير المهني.
        نهدف إلى بناء جسر بين الطلاب والشركات لتطوير المهارات وبناء المستقبل المهني.
      </p>
      <div class="social-icons">
        <a href="#"><i class="ri-instagram-line"></i></a>
        <a href="#"><i class="ri-linkedin-fill"></i></a>
        <a href="#"><i class="ri-twitter-fill"></i></a>
        <a href="#"><i class="ri-facebook-fill"></i></a>
      </div>
    </div>


    <div style={{textAlign:"right"}}class="footer-section links">
      <h3 style={{marginBottom:"10px"}}>روابط سريعة</h3>
      <ul >
        <li><a href="#">فرص التدريب</a></li>
        <li><a href="#">الشركات</a></li>
        <li><a href="#">من نحن</a></li>
        <li><a href="#">اتصل بنا</a></li>
      </ul>
    </div>


    <div style={{textAlign:"right"}}class="footer-section contact">
      <h3 style={{marginBottom:"10px"}}>تواصل معنا</h3>
      <p> غزة، فلسطين<i class="ri-map-pin-line"></i></p>
      <p> info@gazatraininghub.com<i class="ri-mail-line"></i></p>
      <p>+970 8 123 4567<i class="ri-phone-line"></i> </p>
    </div>
  </div>

  <div class="footer-bottom">
    <p>جميع الحقوق محفوظة © تدريبي  .</p>
    <div class="bottom-links">
      <a href="#">سياسة الخصوصية</a>
      <a href="#">الشروط والأحكام</a>
    
    </div>
   
  </div>
</footer>

    );
  }
  
  export default Footer;