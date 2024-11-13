var url=window.location.pathname;
console.log(url)
if(url=="index.html"){
    let iconForRedirection=document.getElementById('iconRedirect');
    iconForRedirection.addEventListener('click',function(){
        window.location.pathname="phpSAJT/drugiPokusaj/direngine-master/tour.html"
    });
}
if(url=="register.html")
{
    $(document).on('click','#tbButtonRegistration',function(){
        let imePrezime=$('#tbFirstLastName');
        let username=$('#tbUsername');
        let password=$('#tbPassword');
        let email=$('#tbEmail');
        let address=$('#tbAddress');

        let regImePrezime=/^[A-ZČĆŽŠĐ][a-zčćžšđ]{2,14}(\s[A-ZČĆŽŠĐ][a-zčćžšđ]{2,14})+$/;
        let regUsername=/^[a-zA-Z\-]+$/;
        let regPassword=/^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&? "]).*$/;
        let regEmail=/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
        let regAdresa=/^[A-ZČĆŠĐŽ][a-zčćšđž]{2,15}(\s[A-ZČĆŠĐŽ][a-zčćšđž])?\s[1-9]([0-9])?([0-9])$/;
        
        $errors=0;

        if(!regImePrezime.test($(imePrezime).val())){
            $errors++;
            $(imePrezime).addClass('error');
            $('.errorReport')[0].style.display="block";
            console.log('doslo je do greske')
        }
        else{
            $(imePrezime).removeClass('error');
            $(imePrezime).addClass('success');
            $('.errorReport')[0].style.display="none";   
        }

        if(!regUsername.test($(username).val())){
            $errors++;
            $(username).addClass('error');
            $('.errorReport')[1].style.display="block";

        }
        else{
            $(username).removeClass('error');
            $(username).addClass('success');
            $('.errorReport')[1].style.display="none";   
        }

        if(!regPassword.test($(password).val())){
            $errors++;
            $(password).addClass('error');
            $('.errorReport')[2].style.display="block";

        }
        else{
            $(password).removeClass('error');
            $(password).addClass('success');
            $('.errorReport')[2].style.display="none";   
        }

        if(!regEmail.test($(email).val())){
            $errors++;
            $(email).addClass('error');
            $('.errorReport')[3].style.display="block";

        }
        else{
            $(email).removeClass('error');
            $(email).addClass('success');
            $('.errorReport')[3].style.display="none";   
        }


        if(!regAdresa.test($(address).val())){
            $errors++;
            $(address).addClass('error');
            $('.errorReport')[4].style.display="block";

        }
        else{
            $(address).removeClass('error');
            $(address).addClass('success');
            $('.errorReport')[4].style.display="none";   
        }


        if($errors==0){
            let dataForTransfer={
                "firstLastName":$(imePrezime).val(),
                "username":$(username).val(),
                "password":$(password).val(),
                "email":$(email).val(),
                "address":$(address).val(),
            }

            $.ajax({
                url:"./logic/registration-server-validate.php",
                method:"POST",
                dataType:"JSON",
                data:dataForTransfer,

                success:function(result){
                    console.log(result);
                    console.log("uspesna komunikacija sa serverom");
                    location.replace('login.php');
                },
                error:function(err,error,thrownError){
                    console.log(err,error,thrownError);
                }
            })
        }
    })
}
if(url=="/login.php")
{

    $('#tbButtonLogin').click(function(){
        let username=$('#tbUsernameLogin');
        let password=$('#tbPasswordLogin');
        
        let regUsername=/^[a-zA-Z\-]+$/;
        let regPassword=/^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&? "]).*$/;
        let errors=0;

        if(!regUsername.test($(username).val())){
            errors++;
            $(username).addClass('error');
            $('.errorReport')[0].style.display="block";
        }
        else{
            $(username).removeClass('error');
            $(username).addClass('success');
            $('.errorReport')[0].style.display="none";   
        }
        if(!regPassword.test($(password).val())){
            errors++;
            $(password).addClass('error');
            $('.errorReport')[1].style.display="block";
        }
        else{
            $(password).removeClass('error');
            $(password).addClass('success');
            $('.errorReport')[1].style.display="none"; 
        }
        console.log(errors);
        if(errors==0){
            let dataForTransfer={
                'username':$(username).val(),
                'password':$(password).val(),
                'btn':true,
            }
            ajaxCallBack('logic/login-server-validate.json',dataForTransfer,"POST",function(result){
                console.log(result)
                if(result)
                {
                    $('#myModal').fadeIn();
                    $('.welcomeHeading').html(`Welcome ${result.korisnicko_ime}, you are successfully logged in. Enjoy the view!`)
                    $('.close').click(function(){
                        $('.close').fadeOut();
                        location.replace('index.html');
                    })
                }
                else{
                    $('#myModal').fadeIn();
                    $('.welcomeHeading').html(`There is no user with such credentials. Try again`)
                    $('.close').click(function(){
                        $('#myModal').fadeOut();
                        
                    })
                }
            });

        }
    });
}
    if(url=='tour.html')
    {
        var TEST=[];
        console.log($('#ddlCountries').val());
        $.post('dataProducts.php',function(dataResult){
            console.log(dataResult);
            showHotels(dataResult);
        });
        $(document).on('change','#ddlCountries',function(){
            let ddlValue=$('#ddlCountries option:selected').text();
            let ddlIndex=$('#ddlCountries option:selected').val();

            let dataForTransfer={
                'dropDownValue':ddlValue,
                'dropDownIndex':ddlIndex,   
            }
            ajaxCallBack('logic/filter.json',dataForTransfer,'POST',function(result){
                console.log(result)
                showHotels(result);
            })
            console.log(ddlValue);
            console.log(ddlIndex);

        })

        $("#btnFiltering").click(function(){
            let lowerLimitPrice=$('#tbLowerLimit').val();
            let upperLimitPrice=$('#tbUpperLimit').val();

            let dataForTransfer={
                
                'lowerPriceFilter':lowerLimitPrice,
                'upperPriceFilter':upperLimitPrice,
                'btn':true,
            }

            ajaxCallBack('logic/filterPrice.json',dataForTransfer,'POST',function(result){
                console.log(result)
                showHotels(result);
            })
        })
        let arrayStars=[];
        $(document).on('click','#starRatingFiltering>input',function(el){
            let radioButton=$(this).val();
            console.log(radioButton)


            let dataForTransfer={
                'buttonRadio':radioButton
            }

            ajaxCallBack('logic/filterStars.json',dataForTransfer,'POST',function(result){
                console.log(result)
                showHotels(result);
            })
            console.log(arrayStars);
        })
};
if(url=='index.html'){
    let daLiJeUspostavljenaSesija=$('.buttonReserve');
    console.log(daLiJeUspostavljenaSesija.length)
    $(daLiJeUspostavljenaSesija).on('click',function(e){
        let indexCounter=$(this).data('counter');
        let indexHotel=$(this).data('idsoba');
        let indexHotel1=$(this).data('idhotel1');
        let INDEKS=$(this).data('tipsobe');
        console.log($(this).data('idsoba'));
        console.log($('#loginInfo'));
        console.log($(this).data('counter'))
        console.log($(this).data('checking'));
        let vrednost=$(this).data('islogged');
        let checking=$(this).data('checking');
        let arrayForDetails = checking.replace('[','').replace(']','').split(",").map(String);
        console.log(arrayForDetails);
        console.log($(this).data('idhotel'));
        let indexForTransport=$(this).data('idhotel');
        if(vrednost=='-'){
            $('#loginInfo').html("<p>You have to <a href='login.php' style='color:red'>login</a> or <a href='register.php' style='color:red'>register</a> in order to reserve</p>")
        }
        else
        {
            $('#myModal').fadeIn();
            if($('#myModal').is(':visible')){
                console.log('vidljivo')
                $('body').addClass('body-overflow');
            }
            let dataForTransfer={
                'it_tip_sobe':INDEKS,
                'id_hotel_info':indexHotel1,
                'id_hits':indexForTransport,
                'id_soba':indexHotel,
            }
            ajaxCallBack('logic/hotelAndRoomDeatiledInfo.json',dataForTransfer,'POST',function(result){
                console.log(123);
                let checkin,checkout,reserveDuration;
                console.log(checkin);
                console.log(checkout);
                showHotelRoomInfoForReservation(result,checkin,checkout);
                $("#checkin").on("input",function(){
                    checkin=$('#checkin').val();
                    if(checkout>checkin)
                    {
                        $('#submitButton').attr('disabled',false);
                    }
                    else{
                        $('#submitButton').attr('disabled',true);
                    }
                    console.log(checkin);
                 });
                 $('#checkout').on('input',function(){
                    checkout=$('#checkout').val();
                    if(checkin<checkout)
                    {
                        $('#submitButton').attr('disabled',false);
                    }
                    else{
                        $('#submitButton').attr('disabled',true);
                    }
                    console.log(checkout);
                 })
                $('#submitButton').on('click',function(){
                    console.log($('#checkout').val());
                    console.log($('#checkin').val());
                    let checkout=$('#checkout').val();
                    let checkin=$('#checkin').val();
                    if(Date.parse(checkin)>Date.parse(checkout)){
                        $('#checkIfDatesAreValid').css('display','block');
                        $('#checkIfDatesAreValid').html('Checkout must be atleast one day after checkin!');
                        $('#finalPrice').css('display','none');
                        $('#reserveSpace').removeClass('d-flex');
                        $('#reserveSpace').addClass('d-none');
                        $('#reserveSpace').removeClass('justify-content-center');
                    }
                    else{
                        $('#checkIfDatesAreValid').css('display','none');
                        let days = parseInt(((Date.parse(checkout)-Date.parse(checkin)) / (1000 * 60 * 60 * 24)).toFixed(1));
                        console.log(days)
                        $('#numberOfDaysReserved').html('Number of days in reservation:'+days);
                        let price=$('#finalPrice').data('pricevalue');
                        let priceBasedOnReserveDuration=price*(5/100);
                        console.log(price*(5/100))
                        for(var i=0;i<days;i++){
                            price+=priceBasedOnReserveDuration;
                        }
                        $('#finalPrice').css('display','block');
                        $('#finalPrice').html('<h3 class="text-center">Final price:'+price+'&euro;</h3>');
                        $('#reserveSpace').removeClass('d-none');
                        $('#reserveSpace').addClass('d-flex');
                        $('#reserveSpace').addClass('justify-content-center');

                        $('#reserveButton').on('click',function(){
                            let reserveObj=$(this).data('hotelreserve');
                            console.log($(this).data('hotelreserve'));
                            let userFirstAndLastName=$('#userCredentials').data('name');
                            let userEmail=$('#userCredentials').data('useremail');
                            let reservationDate=new Date(checkin);
                            let reservationCheckOut=new Date(checkout);
                            let dateFormatForSQL=reservationDate.getFullYear()+"-"+(reservationDate.getMonth()+1)+"-"+reservationDate.getDate()+" "+reservationDate.getHours()+":"+reservationDate.getMinutes();
                            let dateCheckOutForSQL=reservationCheckOut.getFullYear()+"-"+(reservationCheckOut.getMonth()+1)+"-"+reservationCheckOut.getDate()+" "+reservationCheckOut.getHours()+":"+
                            reservationCheckOut.getMinutes();
                            let idRoomType=reserveObj.roomHits;
                            let priceId=$(this).data('priceid');

                            console.log(dateFormatForSQL);
                            console.log(reservationDate);
                            let dataTransfer={
                                'firstLastName':userFirstAndLastName,
                                'email':userEmail,
                                'dateCheckIn':dateFormatForSQL,
                                'id':idRoomType,
                                'dateCheckOut':dateCheckOutForSQL,
                                'idPrice':priceId
                                
                            };
                            console.log(dataTransfer)
                            ajaxCallBack('logic/bookingReservation.json',dataTransfer,'POST',function(result){


                                $('#myModal2').fadeIn();
                                $('#successfulReservation').html(`You have successfully reserved ${reserveObj.roomType}`);

                            })
                            $('.close').click(function(){
                                $('#myModal2').fadeOut();
                                window.location.reload();
                            })
                        })
                    }
                })
            })

            $('.close').click(function(){
                $('body').removeClass('body-overflow');
            $('#myModal').fadeOut();
            })
        }
        console.log(e.target.value)
        
        console.log(vrednost);

    })
}
$('#AdminNewHotelInsertion').on('click',function(){
    let hotelName=$('#hotelName');
    let hotelCoverImage=$('#hotelImageCover');
    let checkIfImageIsValid=hotelImage(hotelCoverImage.val());
    function hotelImage(cover){
        return(cover.match(/\.(jpeg|jpg|gif|png)$/)!=null);
    }
    console.log(checkIfImageIsValid);
    let hotelStreet=$('#hotelStreet');
    let hotelStreetNumber=$('#streetNumber');
    let hotelStars=$('#hotelStars');
    let hotelRooms=$(".hotelRoomTypesChecked");
    let checkedBoxes=$('.valueForCheckedInputs');
    let pricesForCheckedBoxed=$('.pricesForSelectedRooms');
    console.log(checkedBoxes);
    let roomTypeArray=[];
    let roomTypeArrayForIndexes=[];
    let roomTypeArrayForPrices=[];
    for(var i=0;i<hotelRooms.length;i++){
        console.log(checkedBoxes[i]);
        if(hotelRooms[i].checked){
            roomTypeArray.push(checkedBoxes.eq(i).text());
            roomTypeArrayForIndexes.push(checkedBoxes.eq(i).data('indexx'));
            roomTypeArrayForPrices.push(pricesForCheckedBoxed.eq(i).val())
        }
    }
    console.log(roomTypeArray);
    console.log(roomTypeArrayForIndexes);
    console.log(roomTypeArrayForPrices);
    let cityDdl=$('#destinationSelectedOption option:selected').text();
    console.log(cityDdl);

    let serviceArray=[];
    let hotelService=$('.hotelServiceChecked');
    let hotelServiceText=$('.valueForCheckedServices');
    for(var i=0;i<hotelService.length;i++){
        if(hotelService[i].checked){
            serviceArray.push(hotelServiceText.eq(i).text());
        }
    }
    let pricesArray=[];
    $errors=0;
    console.log(hotelName.val().length)
    if(hotelName.val().length<1||hotelName.val().length>35)
    {
        console.log('greska')
        $errors++;
        $(hotelName).css('border','1px solid red');
        $('#nameErrorReport').css({'display':'block','text-align':'center'})
    }
    else{
        console.log('Ispravno');
        $(hotelName).css('border','1px solid black');
        $('#nameErrorReport').css({'display':'none'});
    }

    if(checkIfImageIsValid==false){
        $errors++;
        $(hotelCoverImage).css('border','1px solid red');
        $('#imageErrorReport').css({'display':'block','text-align':'center'});
    }
    else{
        $(hotelCoverImage).css('border','1px solid black');
        $('#imageErrorReport').css({'display':'none'});
    }

    if(/^[a-zA-Z]+$/.test(hotelStreet.val())==false)
    {
        $errors++;
        $(hotelStreet).css('border','1px solid red');
        $('#streetErrorReport').css({'display':'block','text-align':'center'});
    }
    else{
        $(hotelStreet).css('border','1px solid black');
        $('#streetErrorReport').css({'display':'none'});

    }
    console.log((parseInt(hotelStreetNumber.val())));
    if(!/^\d+$/.test($(hotelStreetNumber).val())){
        $errors++;
        $(hotelStreetNumber).css('border','1px solid red');
        $('#streetNumberErrorReport').css({'display':'block','text-align':'center'})
    }
    else{
        $(hotelStreetNumber).css('border','1px solid black');
        $('#streetNumberErrorReport').css('display','none');
    }
    console.log(/^\d+$/.test(hotelStars.val()));
    if((hotelStars.val()<1||hotelStars.val()>5)||(/^\d+$/.test(hotelStars.val())==false))
    {
        $errors++;
        $(hotelStars).css('border','1px solid red');
        $('#starsErrorReport').css({'display':'block','text-align':'center'})

    }
    else{
        $(hotelStars).css('border','1px solid black');
        $('#starsErrorReport').css('display','none');
    }
    if(roomTypeArray.length==0){
        $errors++;
        $('#roomTypeErrorReport').css({'display':'block','text-align':'center'})
    }
    else{
        $('#roomTypeErrorReport').css('display','none')
    }
    if($('#destinationSelectedOption option:selected').val()==""){
        $errors++;
        $('#destinationSelectedOption').css('border','1px solid red');
        $('#destinationErrorReport').css({'display':'block','text-align':'center'});
    }
    else{
        $('#destinationSelectedOption').css('border','1px solid black');
        $('#destinationErrorReport').css('display','none');
    }
    if(serviceArray.length==0){
        $errors++;
        $('#serviceErrorReport').css('display','block');
    }
    else{
        $('#serviceErrorReport').css('display','none');
    }
    if ($(hotelName).val() !== undefined && $(hotelName).val() !== null) {
        console.log('Naziv je u redu');
    }
    else{
        console.log('NAZIV JE NULL');
    }
    if ($(hotelCoverImage).val() !== undefined && $(hotelCoverImage).val() !== null) {
        console.log('Slika je u redu');
    }
    else{
        console.log('SLIKA JE NULL');
    }
    if ($(hotelStreet).val() !== undefined && $(hotelStreet).val() !== null) {
        console.log('Ulica je u redu');
    }
    else{
        console.log('ULICA JE NULL');
    }
    if ($(hotelStreetNumber).val() !== undefined && $(hotelStreetNumber).val() !== null) {
        console.log('Broj Ulice je u redu');
    }
    else{
        console.log('BROJ ULICE JE NULL');
    }
    if ($(roomTypeArray) !== undefined && $(roomTypeArray) !== null) {
        console.log('Tipovi soba su u redu');
    }
    else{
        console.log('TIPOVI SOBA SU NULL');
    }
    if ($('#destinationSelectedOption option:selected').val() !== undefined && $('#destinationSelectedOption option:selected').val() !== null) {
        console.log('Destinacija je u redu');
    }
    else{
        console.log('DESTINACIJA JE NULL');
    }
    if ($('#destinationSelectedOption option:selected').data('iddestination') !== undefined && $('#destinationSelectedOption option:selected').data('iddestination') !== null) {
        console.log('Id Destinacije je u redu');
    }
    else{
        console.log('ID DESTINACIJE JE NULL');
    }
    if($(serviceArray) !== undefined &&$(serviceArray) !== null){
        console.log('usluge su u redu');
    }else{
        console.log('USLUGE SU NULL');
    }
    if($(hotelStars).val() !== undefined && $(hotelStars).val() !== null){
        console.log('broj zvezdica hotela su u redu');
    }else{
        console.log('BROJ ZVEZDICA HOTELA JE NULL');
    }
    if($errors==0){
        let dataForTransfer={
            'hotelName':$(hotelName).val(),
            'hotelCoverImage':$(hotelCoverImage).val(),
            'hotelStreet':$(hotelStreet).val(),
            'hotelStreetNumber':$(hotelStreetNumber).val(),
            'hotelStars':$(hotelStars).val(),
            'roomTypeArray':roomTypeArray,
            'destination':$('#destinationSelectedOption option:selected').text(),
            'destinationId':$('#destinationSelectedOption option:selected').data('iddestination'),
            'roomTypeArrayForPrices':roomTypeArrayForPrices,
            'serviceArray':serviceArray
        };
        console.log(dataForTransfer);
        ajaxCallBack('logic/adminInsertHotels.json',dataForTransfer,'POST',function(result){
            console.log(result);
        })
    }

    console.log($('#destinationSelectedOption option:selected').val())
    console.log(hotelName,hotelCoverImage,hotelStreet,hotelStreetNumber,hotelStars,roomTypeArray,cityDdl,serviceArray);

})

console.log(document.getElementsByClassName('deleteClickedHotelAdmin'))

$('.deleteClickedHotelAdmin').on('click',function(){
    console.log($(this).data('iddeletinghotel'));
    let dataForTransfer={
        'idForDeleting':$(this).data('iddeletinghotel')
    };
    console.log(dataForTransfer);
    ajaxCallBack('logic/deleteHotelAdmin.json',dataForTransfer,'POST',function(result){
        console.log(result);
        window.location.reload();
    })
});

$('#updateHotelButtonAdmin').on('click',function(){
    console.log(123);
    let serviceArray=[];
    let hotelService=$('.hotelServiceChecked');
    let hotelServiceText=$('.valueForCheckedServices');

    let roomTypeArray=[];
    let roomTypeArrayForIndexes=[];
    let roomTypeArrayForPrices=[];
    let roomTypeAvailableRooms=[];
    let checkedBoxes=$('.valueForCheckedInputs');
    let numberOfRooms=$('.numbersForSelectedRooms');
    for(var i=0;i<checkedBoxes.length;i++)
    {
        roomTypeArray.push(checkedBoxes.eq(i).text());
    }
    for(var i=0;i<numberOfRooms.length;i++)
    {
        roomTypeAvailableRooms.push(numberOfRooms.eq(i).val());
    }
    console.log(roomTypeArray);
    let pricesForCheckedBoxed=$('.pricesForSelectedRooms');
    for(var i=0;i<pricesForCheckedBoxed.length;i++){
        roomTypeArrayForPrices.push(pricesForCheckedBoxed.eq(i).val());
    }
    console.log(roomTypeArray);
    console.log(roomTypeArrayForPrices);
    console.log(roomTypeAvailableRooms);
    let dataForTransfer={
        'hotelName':$('#hotelName').val(),
        'hotelCoverImage':$('#hotelImageCover').val(),
        'hotelStreet':$('#hotelStreet').val(),
        'hotelStreetNumber':$('#streetNumber').val(),
        'hotelStars':$('#hotelStars').val(),
        //'serviceArray':serviceArray,
        'roomType':roomTypeArray,
        'roomTypePrices':roomTypeArrayForPrices,
        'roomTypeRooms':roomTypeAvailableRooms,
        'destination':$('#destinationSelectedOption option:selected').text(),
        'destinationId':$('#destinationSelectedOption option:selected').data('iddestination'),
        'idHotel':$(this).data("id")
    }
    console.log($('#destinationSelectedOption option:selected').data('iddestination'));
    ajaxCallBack('logic/updateHotelByIdAdmin.json',dataForTransfer,'POST',function(result){
        console.log(result)
    })
    console.log(dataForTransfer);
})
if(url='phpSAJT/drugiPokusaj/direngine-master/template/index.html'){
    //console.log('Uslo je u admin panel');
}
function showHotels(result){
    console.log(result);
    let html="";
    console.log('duzina rezultujuceg objekta je:'+result.length)
    if(result.length==0){
        $('#printingFilteredResults').html(`<div class="alert alert-danger" role="alert">Oops, looks like there are no hotels with specified criteria!</div>`)
    }
    else{
        for(objRes of result)
        {
            html+=`
        <div class="col-md-4 ftco-animate">
                        <div class="destination">
                            <a href="#" class="img img-2 d-flex justify-content-center align-items-center" style="background-image: url(images/${objRes.cover_slika});">
                                <div class="icon d-flex justify-content-center align-items-center">
                            <span class="icon-search2"></span>
                        </div>
                            </a>
                            <div class="text p-3">
                                <div class="d-flex">
                                    <div class="one">
                                        <h3><a href="#">${objRes.naziv}</a></h3>
                                        <p class="rate">`
                                        for(var i=0;i<objRes.broj_zvezdica;i++){
                                            html+=`
                                            <i class="icon-star"></i>`
                                        }
                                        html+=`
                                        </p>
                                    </div>
                                    <div class="two">
                                        <span class="price">${objRes.cena}&euro;</span>
                                    </div>
                                </div>
                                <p class="days"><span>2 days 3 nights</span></p>
                                <hr>
                                <p class="bottom-area d-flex">
                                    <span><i class="icon-map-o"></i> ${objRes.naziv_drzava}, ${objRes.naziv_grad}</span> 
                                    <span class="ml-auto"><a href="hotels5656.html?id=${objRes.id_hotel}&amp;idInfo=${objRes.id_hotel_info}">Discover</a></span>
                                </p>
                            </div>
                        </div>
                    </div>`                               
        }
        $('#printingFilteredResults').html(html);
    }
}
$('#tbButtonContact').on('click',function(){
    let username=$('#tbUsernameContact');
    let email=$('#tbEmailContact');
    let message=$('#tbTextAreaContact');
    $errors=0;
    if(!(/^[a-zA-Z\-]+$/.test($(username).val()))){
        $errors++;
        $('#usernameError').css('display','block');
        ///^[a-zA-Z\-]+$/
    }
    else{
        $('#usernameError').css('display','none');
    }
    if(!(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/).test($(email).val())){
        $errors++;
        $('#emailError').css('display','block');
    }
    else{
        $('#emailError').css('display','none');
    }
    if(($(message).val().length)<=15){
        $errors++;
        $('#textareaError').css('display','block');
    }
    else{
        $('#textareaError').css('display','none');
    }

    if($errors==0){
        let dataForTransfer={
            'username':$(username).val(),
            'email':$(email).val(),
            'message':$(message).val(),
        };
        console.log(dataForTransfer);
        ajaxCallBack('logic/sendMessageViaContact.json',dataForTransfer,'POST',function(result){
            //console.log(result);
            $('#resultContactReport').html(`<div class="alert alert-success" role="alert">
            Your message has been sent, We will answer as soon as possible!
          </div>`);
        },function(result){
            $('#resultContactReport').html(`<div class="alert alert-danger" role="alert">
            There was some problem with sending message. Please try again later.
          </div>`);
        })
    }
})
$('#tbButtonPollAnswer').on('click',function(){

    let checkedAnswer=$("input[name='rbServicePoll']:checked").data('pollanswer');
    let pollAnswerId=$("input[name='rbServicePoll']:checked").data('pollid');
    let userId=$("input[name='rbServicePoll']:checked").data('userid');

    let dataForTransfer={
        'pollAnswer':checkedAnswer,
        'pollId':pollAnswerId,
        'userId':userId
    };
    ajaxCallBack('logic/pollInsertion.json',dataForTransfer,'POST',function(result){

        if(result!=false)
        {
            $('#pollInsertionSuccessful').html('<div class="alert alert-success" role="alert">Thank you for answering our poll!</div>');
        }
        else
        {
            $('#pollInsertionSuccessful').html('<div class="alert alert-danger" role="alert">Sorry, you are unable to answer poll more than once</div>');
        }
    })
})
$('#insertUserAdmin').on('click',function(){
    let firstLastName=$('#userFirstLastName');
    let username=$('#username');
    let email=$('#email');
    let password=$('#password');
    let address=$('#address');
    let role=$("input[name='rbRole']:checked");
    console.log(role);
    $errors=0;

    if(!(/^[A-ZČĆŽŠĐ][a-zčćžšđ]{2,14}(\s[A-ZČĆŽŠĐ][a-zčćžšđ]{2,14})+$/.test($(firstLastName).val()))){
        $errors++;
        $('#firstLastNameErrorReport').css({'display':'block'});
        ///^[a-zA-Z\-]+$/
    }
    else{
        $('#firstLastNameErrorReport').css('display','none');
    }
    if(!(/^[a-zA-Z\-]+$/).test($(username).val())){
        $errors++;
        $('#usernameErrorReport').css('display','block');
    }
    else{
        $('#usernameErrorReport').css('display','none');
    }
    if(!(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/).test($(email).val())){
        $errors++;
        $('#emailErrorReport').css('display','block');
    }
    else{
        $('#emailErrorReport').css('display','none');
    }
    if(!(/^[A-ZČĆŠĐŽ][a-zčćšđž]{2,15}(\s[A-ZČĆŠĐŽ][a-zčćšđž])?\s[1-9]([0-9])?([0-9])$/).test($(address).val())){
        $errors++;
        $('#addressErrorReport').css('display','block');
    }
    else{
        $('#addressErrorReport').css('display','none');
    }
    if(!(/^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&? "]).*$/).test($(password).val())){
        $errors++;
        $('#passwordErrorReport').css('display','block');
    }
    else{
        $('#passwordErrorReport').css('display','none');
    }
    if(role==undefined)
    {
        $errors++;
        $('#roleErrorReport').css('display','block');
    }
    else{
        $('#roleErrorReport').css('display','none');
    }
    if($errors==0){
        let dataForTransfer={
            'firstLastName':$(firstLastName).val(),
            'username':$(username).val(),
            'email':$(email).val(),
            'password':$(password).val(),
            'address':$(address).val(),
            'role':$(role).val(),
        };

        ajaxCallBack('../logic/insertUserAdmin.php',dataForTransfer,'POST',function(result){
            $('#userInsertionResult').html(`<div class="alert alert-success" role="alert">User has been successfully created!</div>`);
        })
    }

})
$('.buttonForCancelingReservation').on('click',function(){
    let idCancel=$(this).data('cancelreg');

    let dataForTransfer={
        'cancel':idCancel
    }
    ajaxCallBack('logic/cancelReservation.php',dataForTransfer,'POST',function(result){

    })
})
function showHotelRoomInfoForReservation(result,checkInDate,checkOutDate){
    console.log('ULAZAK')
    console.log(result);
    console.log(checkInDate);
    console.log(checkOutDate);
    let html="";
        let currentDay=new Date();
        var month = currentDay.getMonth() + 1;
        var day = currentDay.getDate();
        var year = currentDay.getFullYear();
        if(month < 10)
            month = '0' + month.toString();
        if(day < 10)
            day = '0' + day.toString();
        let finalDate=year+'-'+month+'-'+day+'T00:00';
        finalDate.split('T');

        let nextDay=new Date();
        var month1 = nextDay.getMonth() + 1;
        var day1 = nextDay.getDate()+1;
        var year1 = nextDay.getFullYear();
        if(month1 < 10)
            month1 = '0' + month1.toString();
        if(day1 < 10)
            day1 = '0' + day1.toString();
        let finalDateCheckout=year1+'-'+month1+'-'+(day1)+'T00:00';
        console.log(finalDate);
        $('#checkin').attr('min',finalDate);
        console.log(year+'-'+month+'-'+day+'00:00');
        html+=`<div class='col-lg-12'>
            `
            html+=`<div class='row'><div class='col-lg-6'>`

                html+=`<img class='img-fluid max-width: 100%' src='images/${result.slika_src}'/>`;
                html+=`</div><div class='col-lg-6 '>`
                html+=`<div class='col-lg-12'>
                <h3 class='font-weight-bold text-center'>Room information</h3>
                <p class='text-center'> Room type:${result.naziv_soba}</p>
                <div class='row'>
                    <div class='col-lg-6'>
                        <div class="input-group date form-group">
                        <p>Check-In: <input type="datetime-local" id="checkin" min="`+finalDate+`"></p>
                        <div class='containerPicker'></div>
                            <div class="input-group-addon">
                                <span class="glyphicon glyphicon-th"></span>
                            </div>
                        </div>
                    </div>
                    <div class='col-lg-6'>`;

                    html+=`<div class="input-group date form-group">
                            <p>Check-Out: <input type="datetime-local" id="checkout" min="`+finalDateCheckout+`"></p>
                            <div class='containerPicker'></div>
                            <div class="input-group-addon">
                                <span class="glyphicon glyphicon-th"></span>
                            </div>
                        </div>
                    </div>
                    <!--<span class='col-lg-6' id='infoAboutPriceForReservation'></span>-->
                    <span class='col-lg-12'><input type='button' value='Check prices' id='submitButton' disabled/></span>
                    <span class='col-lg-12 text-center' id='numberOfDaysReserved'></span>
                    <span class='col-lg-12' id='checkIfDatesAreValid'></span>
                    <span class='col-lg-12' class='fs-1' data-pricevalue='${parseFloat(result.cena)}' id='finalPrice'></span>
                    <span class='col-lg-12 d-none' id='reserveSpace'><input type='button' value="I'll reserve!" id='reserveButton' data-priceid='${result.id_cena}' data-hotelreserve='{ "price":"${parseFloat(result.cena)}","roomType":"${result.naziv_soba}","roomImage":"${result.slika_src}","roomHits":"${result.id_hits}" }' class='w-50 text-center'/></span>
                </div>`
                html+=`</div><div class='col-lg-6'></div></div></div></div>`;
            console.log($('#checkin').val())
            $('#submitButton').on('click',function(){
                console.log($('#checkout').val());
                console.log($('#checkin').val());
            })
    console.log(result);
    $('.welcomeHeading').html(html);
}
function dateInput(event){

    console.log(event.target.id);
    if(event.target.value!=null){
        $('#checkOut').attr('disabled',false)
        console.log(event.target.value);
        document.getElementById('checkOut').addEventListener('change',function(){
            console.log('promena')
        })
    }else{
        $('#checkOut').attr('disabled',true)
    }
}
function dateInput2(event){
    if($('#checkIn').val()==null){
        $('#checkOut').attr('disabled',true);
    }
}

function printingHotels(dataResult){
    var html="";
    let usluge=[];
    var objectService=dataResult.service
        for(objAbc of objectService){
            usluge.push(objAbc);
        }
    if(dataResult.length!=0){
        var service=[];
        var counter=0;
        
        for(objRes of dataResult.productObj)
        {
        html+=`
        <div class="col-md-4 ftco-animate">
                        <div class="destination">
                            <a href="#" class="img img-2 d-flex justify-content-center align-items-center" style="background-image: url(images/${objRes.cover_slika});">
                                <div class="icon d-flex justify-content-center align-items-center">
                            <span class="icon-search2"></span>
                        </div>
                            </a>
                            <div class="text p-3">
                                <div class="d-flex">
                                    <div class="one">
                                        <h3><a href="#">${objRes.naziv}</a></h3>
                                        <p class="rate">`
                                        for(var i=0;i<objRes.broj_zvezdica;i++){
                                            html+=`
                                            <i class="icon-star"></i>`
                                        }
                                        html+=`
                                        </p>
                                    </div>
                                    <div class="two">
                                        <span class="price">$200</span>
                                    </div>
                                </div>
                                <p>Services: </p>`
                                for(var i=0;i<usluge[i].service.length;i++){
                                    html+=`<p>${usluge[counter].service[i]}</p>`
                                }

                                html+=`
                                <p class="days"><span>2 days 3 nights</span></p>
                                <hr>
                                <p class="bottom-area d-flex">
                                    <span><i class="icon-map-o"></i> ${objRes.naziv_drzava}, ${objRes.naziv_grad}</span> 
                                    <span class="ml-auto"><a href="hotels.php?id=${objRes.id_hotel}">Discover</a></span>
                                </p>
                            </div>
                        </div>
                    </div>`
                    counter++;
        }
        
    }
    $('#printingFilteredResults').html(html);
}
function catchServices(result,idHotel){
    var newArray=[];
    for(var i=0;i<result.length;i++){
        if(result[i].id_hotel==idHotel){
        newArray.push(result[i].naziv_usluga);
        }
    }

    return newArray;
}

function setUniqueValues(result,idHotel){
    var newArray=[];

    return newArray;
}
function ajaxCallBack(url,data,method,result,error){
    $.ajax({
        url:url,
        data:data,
        method:method,
        dataType:"JSON",
        success:result,
        error:error
    });
}
$('.dropbtn').on('click',function(e){
    console.log(e.target.value);
    console.log($('.dropdown-content')[e.target.value])
    $('.dropdown-content').eq(e.target.value).slideToggle()/*classList.toggle('show')*/;
})