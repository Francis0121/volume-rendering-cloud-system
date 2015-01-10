/**
 * UI.Event
 */
var medical = { }; // base object

medical.event = {

    $ethis : null,

    run : function(){
        $ethis = this;

        $ethis.join();
        $ethis.signin();
        $ethis.volumeList();

        if( medical.stream !== undefined && medical.connect !== undefined) {
            $ethis.stream.type();
            $ethis.stream.axisType();

            $ethis.stream.axis();
            $ethis.stream.otf();
            $ethis.stream.brightness();
            $ethis.stream.scale();
            $ethis.stream.type();

            $ethis.stream.mouse();
        }
    },

    join : function(){
        $('#delete_password').on('change', function(){
            var thiz = $(this);
            thiz.val() != '' ? thiz.addClass('delete_input_active') : thiz.removeClass('delete_input_active');
        });
    },

    signin : function(){
        $('#username, #password').on('change', function(){
            var thiz = $(this);
            thiz.val() != '' ? thiz.addClass('signin_input_active') : thiz.removeClass('signin_input_active');
        });
    },

    volumeList : function(){
        $('#volume_rendering tbody tr').on('click', function(){
            location.href='../stream/volumepn/'+$(this).attr('data-pn');
        });
    },

    stream : {
        type : function(){
            $('.option_rendering ul li').on('click', function(){
                var thiz = $(this);
                var $sthis = medical.stream;
                var type = thiz.attr('data-type');

                $('.option_rendering ul li').removeClass('option_select_wrap_active').addClass('option_select_wrap_none');
                thiz.removeClass('option_select_wrap_none').addClass('option_select_wrap_active');

                if(type == $sthis.RENDERING_TYPE.VOLUME){
                    $('.option_zoom').show();
                    $('.option_brightness').show();
                    $('.option_otf').show();
                    $('.option_axis').hide();
                }else if(type == $sthis.RENDERING_TYPE.MRI){
                    $('.option_zoom').hide();
                    $('.option_brightness').hide();
                    $('.option_otf').hide();
                    $('.option_axis').show();

                    $sthis.sendOption.rotationX = $sthis.MRI_DEFAULT_OPTION.rotationX;
                    $sthis.sendOption.rotationY = $sthis.MRI_DEFAULT_OPTION.rotationY;
                    $sthis.sendOption.positionZ = $sthis.MRI_DEFAULT_OPTION.positionZ;
                }else if(type == $sthis.RENDERING_TYPE.MIP){
                    $('.option_zoom').show();
                    $('.option_brightness').hide();
                    $('.option_otf').hide();
                    $('.option_axis').hide();
                }

                if($sthis.sendOption.mriType === $sthis.MRI_TYPE.X){
                    $sthis.sendOption.transferScaleX = $sthis.mriX_option.transferScaleX;
                    $sthis.sendOption.transferScaleY = $sthis.mriX_option.transferScaleY;
                    $sthis.sendOption.transferScaleZ = $sthis.mriX_option.transferScaleZ;
                }else if($sthis.sendOption.mriType === $sthis.MRI_TYPE.Y){
                    $sthis.sendOption.transferScaleX = $sthis.mriY_option.transferScaleX;
                    $sthis.sendOption.transferScaleY = $sthis.mriY_option.transferScaleY;
                    $sthis.sendOption.transferScaleZ = $sthis.mriY_option.transferScaleZ;
                }else if($sthis.sendOption.mriType === $sthis.MRI_TYPE.Z){
                    $sthis.sendOption.transferScaleX = $sthis.mriZ_option.transferScaleX;
                    $sthis.sendOption.transferScaleY = $sthis.mriZ_option.transferScaleY;
                    $sthis.sendOption.transferScaleZ = $sthis.mriZ_option.transferScaleZ;
                }

                $sthis.sendOption.request_type = $sthis.REQUEST_TYPE.CHANGE;
                $sthis.sendOption.rendering_type = type;
                $sthis.send();
            });
        },

        axisType : function(){
            $('.option_axis ul li').on('click', function(){
                var thiz = $(this);
                var $sthis = medical.stream;
                var type = thiz.attr('data-type');

                $('.option_axis ul li').removeClass('option_select_wrap_active').addClass('option_select_wrap_none');
                thiz.removeClass('option_select_wrap_none').addClass('option_select_wrap_active');

                $sthis.sendOption.request_type = $sthis.REQUEST_TYPE.CHANGE;
                $sthis.sendOption.mriType = type;

                if($sthis.sendOption.mriType === $sthis.MRI_TYPE.X){
                    $sthis.sendOption.transferScaleX = $sthis.mriX_option.transferScaleX;
                    $sthis.sendOption.transferScaleY = $sthis.mriX_option.transferScaleY;
                    $sthis.sendOption.transferScaleZ = $sthis.mriX_option.transferScaleZ;
                }else if($sthis.sendOption.mriType === $sthis.MRI_TYPE.Y){
                    $sthis.sendOption.transferScaleX = $sthis.mriY_option.transferScaleX;
                    $sthis.sendOption.transferScaleY = $sthis.mriY_option.transferScaleY;
                    $sthis.sendOption.transferScaleZ = $sthis.mriY_option.transferScaleZ;
                }else if($sthis.sendOption.mriType === $sthis.MRI_TYPE.Z){
                    $sthis.sendOption.transferScaleX = $sthis.mriZ_option.transferScaleX;
                    $sthis.sendOption.transferScaleY = $sthis.mriZ_option.transferScaleY;
                    $sthis.sendOption.transferScaleZ = $sthis.mriZ_option.transferScaleZ;
                }
            });
        },

        scale : function(){
            $('#scale').each(function() {
                $( this ).empty().slider({
                    range: 'min',
                    min: 0,
                    value : 3000,
                    max: 10000,
                    animate: true,
                    orientation: 'horizontal',
                    slide: function( event, ui ) {
                        var $sthis = medical.stream;
                        $sthis.sendOption.request_type = $sthis.REQUEST_TYPE.CHANGE;
                        $sthis.sendOption.positionZ = ui.value/1000.0;
                        $sthis.send();
                    }
                });
            });
        },

        brightness : function(){
            $('#brightness').each(function() {
                $( this ).empty().slider({
                    range: 'min',
                    min: 0,
                    max: 200,
                    value : 100,
                    animate: true,
                    orientation: 'horizontal',
                    slide: function( event, ui ) {
                        var $sthis = medical.stream;
                        $sthis.sendOption.request_type = $sthis.REQUEST_TYPE.CHANGE;
                        $sthis.sendOption.brightness = ui.value/100.0;
                        $sthis.send();
                    }
                });
            });
        },

        otf : function(){
            $('#otf').each(function() {
                $( this ).empty().slider({
                    range: 'min',
                    min: 5000,
                    value: 10000,
                    max: 15000,
                    animate: true,
                    orientation: 'horizontal',
                    slide: function( event, ui ) {
                        var $sthis = medical.stream;
                        $sthis.sendOption.request_type = $sthis.REQUEST_TYPE.CHANGE;
                        $sthis.sendOption.transferOffset = (ui.value-10000)/10000.0;
                        $sthis.send();
                    }
                });
            });
        },

        axis : function(){
            $('#axis').each(function() {
                $( this ).empty().slider({
                    range: 'min',
                    min: 5000,
                    value: 10000,
                    max: 15000,
                    animate: true,
                    orientation: 'horizontal',
                    slide: function( event, ui ) {
                        var $sthis = medical.stream;
                        $sthis.sendOption.request_type = $sthis.REQUEST_TYPE.CHANGE;

                        if($sthis.sendOption.mriType == $sthis.MRI_TYPE.X){
                            $sthis.sendOption.transferScaleX = (ui.value)/10000.0;
                            $sthis.mriX_option.transferScaleX = (ui.value)/10000.0;
                        }else if($sthis.sendOption.mriType == $sthis.MRI_TYPE.Y){
                            $sthis.sendOption.transferScaleY = (ui.value)/10000.0;
                            $sthis.mriY_option.transferScaleY = (ui.value)/10000.0;
                        }else if($sthis.sendOption.mriType == $sthis.MRI_TYPE.Z){
                            $sthis.sendOption.transferScaleZ = (ui.value)/10000.0;
                            $sthis.mriZ_option.transferScaleZ = (ui.value)/10000.0;
                        }

                        $sthis.send();
                    }
                });
            });
        },

        isMouseOn : false,
        beforeX : null,
        beforeY : null,
        mouse : function(){
            var $sthis = medical.stream;
            var $cthis = medical.connect;

            $($cthis.selector).on('mousedown', function(event){
                $ethis.stream.isMouseOn = true;
                $ethis.stream.beforeX = event.pageX;
                $ethis.stream.beforeY = event.pageY;
            });

            $($cthis.selector).on('mousemove', function(event){
                if($ethis.stream.isMouseOn){
                    //$('.debug_wrap').append('<p>'+event.pageX + ", " + event.pageY+'</p>');
                    $sthis.sendOption.request_type = $sthis.REQUEST_TYPE.CHANGE;

                    $sthis.sendOption.rotationX += (event.pageX - $ethis.stream.beforeX)/5.0;
                    $sthis.sendOption.rotationY += (event.pageY - $ethis.stream.beforeY)/5.0;

                    $ethis.stream.beforeX = event.pageX;
                    $ethis.stream.beforeY = event.pageY;

                    $sthis.send();
                }
            });

            $('body').on('mouseup', function(event){
                $ethis.stream.isMouseOn = false;
            });
        }

    }
};