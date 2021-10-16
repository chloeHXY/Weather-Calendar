var date = new Date();
var day =1+ date.getDate();
console.log(day);

//默认显示北京天气预报（三天）,可输入任意城市
api(101010100);
function api(city){
    $.ajax({
        url:`https://free-api.heweather.net/s6/weather/forecast?location=${city}&key=fc8bb0300d5d4dcdb32a4f6df3cc3ac2`,
        type: 'get',
        success: function (data,tStatus,jqxhr) {
            console.log(data,tStatus,jqxhr);
            let forecast=data.HeWeather6[0].daily_forecast;
            let content1=`<div class="weather">
            <div class="img"><img src="images/${forecast[0].cond_code_d+".png"}" alt="图片"></div>
            <div class="tem">${forecast[0].tmp_min}°-${forecast[0].tmp_max}°</div>
            <div class="de_wea">${forecast[0].cond_txt_d}</div>
        </div>`;
            console.log(content1,typeof content1);
            let content2=`<div class="weather">
            <div class="img"><img src="images/${forecast[1].cond_code_d+".png"}" alt="图片"></div>
            <div class="tem">${forecast[1].tmp_min}°-${forecast[1].tmp_max}°</div>
            <div class="de_wea">${forecast[1].cond_txt_d}</div>
        </div>`;
            let content3=`<div class="weather">
            <div class="img"><img src="images/${forecast[2].cond_code_d+".png"}" alt="图片"></div>
            <div class="tem">${forecast[2].tmp_min}°-${forecast[2].tmp_max}°</div>
            <div class="de_wea">${forecast[2].cond_txt_d}</div>
        </div>`;
            // console.log(forecast[0].cond_code_d);
            //注意eq无法识别变量！！！
            var today=$('.container div[class="day"]:eq('+day+')');
            today.append(content1);
            today.attr("bg",forecast[0].cond_code_d);
            today.attr("id","today");
            var tomorrow=$('.container div[class="day"]:eq('+(day+1)+')');
            tomorrow.append(content2);
            tomorrow.attr("bg",forecast[1].cond_code_d);
            tomorrow.attr("id","tomorrow");
            var thirdDay=$('.container div[class="day"]:eq('+(day+2)+')');
            thirdDay.append(content3);
            thirdDay.attr("bg",forecast[2].cond_code_d);
            thirdDay.attr("id","thirdDay");
            console.log(2);
            change_bg(today);
        },
        error:function (err){
            console.log(err);
        }
    });
}
$('.f_right').on('click', '.btn', (e) => {
    //按下按钮内容重置
    $('.container div[class="day"]:eq('+day+')').html(day-1);
    $('.container div[class="day"]:eq('+(day+1)+')').html(day);
    $('.container div[class="day"]:eq('+(day+2)+')').html(day+1);
    var city = $(e.currentTarget).prev().val();
    api(city);
})
function change_bg(obj){
    console.log(1);
    // if(obj.getAttribute('bg')==='100'||obj.getAttribute('bg')==='103'||obj.getAttribute('bg')==='104'){
    //     container.style.background='linear-gradient(rgb(203 50 50 / 69%),rgb(221 178 51 / 63%) )';
    // }
    // else if(obj.getAttribute('bg')==='101'||obj.getAttribute('bg')==='102'||obj.getAttribute('bg')==='154'){
    //     container.style.background='url("backgroud/cloud.JPG")';
    //     container.style.backgroundSize='cover';
    // }
    // else{
    //     container.style.background='url("backgroud/rain.JPG")';
    //     container.style.backgroundSize='cover';
    // }
    if(obj.attr('bg')==='100'||obj.attr('bg')==='103'||obj.attr('bg')==='104'){
        container.style.background='linear-gradient(rgb(203 50 50 / 69%),rgb(221 178 51 / 63%) )';
    }
    else if(obj.attr('bg')==='101'||obj.attr('bg')==='102'||obj.attr('bg')==='154'){
        container.style.background='url("backgroud/cloud.JPG")';
        container.style.backgroundSize='cover';
    }
    else{
        container.style.background='url("backgroud/rain.JPG")';
        container.style.backgroundSize='cover';
    }
}
$('.container div[class="day"]:eq('+day+')').mouseover(function(e){
    change_bg($(this));
});
$('.container div[class="day"]:eq('+(day+1)+')').mouseover(function(){
    change_bg($(this));
});
$('.container div[class="day"]:eq('+(day+2)+')').mouseover(function(){
    change_bg($(this));
});
//js实现日程表
// var today=document.getElementById('today');
// var tomorrow=document.getElementById('tomorrow');
// var thirdDay=document.getElementById('thirdDAY');
// today.addEventListener('click',function(){
//     // location.href=""
// })