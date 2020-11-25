


$(document).ready(function() {
  
  
  
  // epd
  
  $("#driver").click(function(event){
    
    $.getJSON('result.json', function(jd) {
      $('#stage').html('<p> Naam: ' + jd.name + '</p>');
      $('#stage').append('<p>Leeftijd : ' + jd.age+ '</p>');
      $('#stage').append('<p> Geslacht: ' + jd.geslacht+ '</p>');
      $('#stage').append('<p> Opmerkingen: ' + jd.opmerkingen+ '</p>');
      $('#stage').append('<p> Recepten: ' + jd.recepten+ '</p>');
    });
    
  });
  
  
  //toegangscode popup  
  $('#toegangscode-vergeten').click( function() {
    alert('U zal binnen enkele seconden een e-mail ontvangen met uw toegangscode');
    console.log('test');
  });
  
  // get value from input and set in local storage
  
  // $('#submit-code').click( function() {
  //   var input = document.getElementById("inlog-input").value;
  
  //   if(localStorage.getItem("Wachtwoord", input)) {
  //     var x = localStorage.getItem("Wachtwoord");
  
  //     if (input === x) {
  //       console.log('Login successful');
  //       window.location.href = "#page-2" ;
  
  //     } else {
  
  //       alert('Verkeerd wachtwoord.');
  //       location.reload();
  
  //     }
  //   }
  // });
  
  
  //inplannen consuultaanvraag
  var afspraakPopUp = $('.afspraak-popup').hide();
  var afspraakIngepland = $('.afspraak-popup__ingepland').hide();
  
  
  $('#data-input').click(function() {
    
    setTimeout(function(){
      afspraakPopUp.show();
    }, 2000);
  });
  
  $('#afspraak-popup__button').click(function() {
    afspraakPopUp.hide();
    afspraakIngepland.show();
    
  });
  
  
  // alarm
  
  var alarm = $('#alarm-button');
  var situatieBtn = $('.buttons-situatie');
  
  $(alarm).click(function() {
    if(alarm.data('clicked', true)) {
      
      setTimeout(() => {
        situatieBtn.css({"visibility":  "visible"});
      }, 1000);
      
      setTimeout(function() {
        alarm.css({"visibility" : "hidden"});
      }, 1500);
      
    };
  });
  
  //maps
  var maps = $('#map');
  var showMapBtn = $('#getPosition');
  // var formMaps = $('.form-maps');
  var formHulp = $('.form-hulp');
  
  showMapBtn.click(function() {
    console.log('button works');
    maps.css({"visibility" : "visible"});
    formHulp.css({"visibility" : "visible"});
    // formMaps.hide();
  });
  
  
  if (localStorage.avatar){
    $(".avatar-patient").addClass(window.localStorage.getItem("avatar"));}
    
    
    $(".avatars a").click(function(e) {
      
      console.log('avatar click');
      
      $(".avatar-patient").removeClass(window.localStorage.getItem("avatar"));
      
      // avatar = $(this).children("img")[0].className;
      avatar = $(this).children("img")[0].className;
      window.localStorage.setItem("avatar", avatar);
      
      $(".avatar-patient").addClass(window.localStorage.getItem("avatar"));
    }); //end function
    
    $(".set-avatar").click(function(){
      
      console.log("set image");
      $(".avatar-patient").attr("src", window.localStorage.getItem("avatar"));
    });
    
  });
  
  
  
  // geolocation
  
  var map, infoWindow;
  function initMap() {
    console.log('map test');
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: -34.397, lng: 150.644},
      zoom: 6
    });
    infoWindow = new google.maps.InfoWindow;
    
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        
        infoWindow.setPosition(pos);
        infoWindow.setContent('Locatie gevonden.');
        infoWindow.open(map);
        map.setCenter(pos);
      }, function() {
        handleLocationError(true, infoWindow, map.getCenter());
      });
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }
  }
  
  function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
      'Error: The Geolocation service failed.' :
      'Error: Your browser doesn\'t support geolocation.');
      infoWindow.open(map);
    }
    
    
    // number pad 
    
    
    function addCode(key){
      var code = document.forms[0].code;
      if(code.value.length < 5){
        code.value = code.value + key;
      }
      if(code.value.length == 5){
        document.getElementById("message").style.display = "block";
        // setTimeout(submitForm,1000);    
      }
    };
    
    
    function emptyCode(){
      document.forms[0].code.value = "";
    };
    
    
    
    
    
    // TAKES PHOTOS ********************************************
    var pictureSource;   // picture source
    var destinationType; // sets the format of returned value
    
    // Wait for device API libraries to load
    //
    document.addEventListener("deviceready",onDeviceReady,false);
    
    // device APIs are available
    //
    function onDeviceReady() {
      pictureSource=navigator.camera.PictureSourceType;
      destinationType=navigator.camera.DestinationType;
    }
    
    // Called when a photo is successfully retrieved
    //
    function onPhotoDataSuccess(imageData) {
      // Uncomment to view the base64-encoded image data
      // console.log(imageData);
      
      // Get image handle
      //
      var smallImage = document.getElementById('smallImage');
      
      // Unhide image elements
      //
      smallImage.style.display = 'block';
      
      // Show the captured photo
      // The in-line CSS rules are used to resize the image
      //
      smallImage.src = "data:image/jpeg;base64," + imageData;
    }
    
    // Called when a photo is successfully retrieved
    //
    function onPhotoURISuccess(imageURI) {
      // Uncomment to view the image file URI
      // console.log(imageURI);
      
      // Get image handle
      //
      var largeImage = document.getElementById('largeImage');
      
      // Unhide image elements
      //
      largeImage.style.display = 'block';
      
      // Show the captured photo
      // The in-line CSS rules are used to resize the image
      //
      largeImage.src = imageURI;
    }
    
    // A button will call this function
    //
    function capturePhoto() {
      // Take picture using device camera and retrieve image as base64-encoded string
      navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 50,
        destinationType: destinationType.DATA_URL });
      }
      
      // A button will call this function
      //
      function capturePhotoEdit() {
        // Take picture using device camera, allow edit, and retrieve image as base64-encoded string
        navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 20, allowEdit: true,
          destinationType: destinationType.DATA_URL });
        }
        
        // A button will call this function
        //
        function getPhoto(source) {
          // Retrieve image file location from specified source
          navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 50,
            destinationType: destinationType.FILE_URI,
            sourceType: source });
          }
          
          // Called if something bad happens.
          //
          function onFail(message) {
            alert('Failed because: ' + message);
          }
          
          var popover = new CameraPopoverOptions(300, 300, 100, 100, Camera.PopoverArrowDirection.ARROW_ANY);
          var options = {
            quality         : 50,
            destinationType : Camera.DestinationType.DATA_URL,
            sourceType      : Camera.PictureSource.SAVEDPHOTOALBUM,
            popoverOptions  : popover
          };
          
          navigator.camera.getPicture(onSuccess, onFail, options);
          
          function onSuccess(imageData) {
            var image = document.getElementById('myImage');
            image.src = "data:image/jpeg;base64," + imageData;
          }
          
          function onFail(message) {
            alert('Failed because: ' + message);
          }
          
          
          // TAKES PHOTOS END ********************************************
          
          
          
          
          document.addEventListener("deviceready", onDeviceReady, false);
          
          function onDeviceReady() {
            navigator.splashscreen.show();
            
            setTimeout(() => {
              navigator.splashscreen.hide();
            }, 3000);
            
          }
          
          // get value from input and set in local storage
          
          
          document.addEventListener("deviceready", onDeviceReady, false);
          
          function onDeviceReady() {
          localStorage.setItem("Wachtwoord", "10000");
          localStorage.getItem("Wachtwoord", "10000");

            var y = document.getElementById('submit-code');
            var storage = window.localStorage;
            
            console.log(typeof localStorage.getItem("Wachtwoord", "10000"))
            
            y.addEventListener("click", function() {
              var input = document.getElementById("inlog-input").value;
            
              console.log(typeof input);
              
              if(storage.getItem("Wachtwoord", input)) {
                var x = storage.getItem("Wachtwoord");
                
                if (input === x) {
                  alert('Login successful');
                  window.location.href = "#page-2" ;
                  
                } else {
                  
                  alert('Verkeerd wachtwoord.');
                  location.reload();
                  
                }
              };
            });
          };
          
          