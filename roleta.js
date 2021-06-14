
    var colors = ["#b3ffb3",
                  "#c2f0c2",
                  "#b3ffe0",
                  "#b3d1ff",
                  "#b3b3ff",
                  "#ecb3ff",
                  "#ffb3d1",
                  "#ffb3b3",
                  "#ffc2b3",
                  "#ffd1b3",
                  "#ffffb3",
                  "#ecffb3",
                  "#e5e5cc",
                  "#d1e0e0",
                  "#e6b3ff",
                  "#b3ffff"];

    var virtudes = ["1",
                    "2",
                    "3",
                    "4",
                    "5",
                    "6",
                    "7",
                    "8",
                    "9",
                    "10",
                    "11",
                    "12",
                    "13",
                    "14",
                    "15",
                    "16"];

    var premios = ["Boné",
                "Camiseta",
                "Chaveiro",
                "Bolsa",
                "Porta copo",
                "Porta lata",
                "Copo personalizado",
                "Mochila",
                "Lápis",
                "Caneta",
                "Mouse",
                "Teclado",
                "Mascara",
                "Garrafa",
                "Caneca",
                "Creme"];

    var startAngle = 0;
    var arc = Math.PI / 8;
    var spinTimeout = null;

    var spinArcStart = 10;
    var spinTime = 0;
    var spinTimeTotal = 0;

    var ctx;

    function draw() {
      drawRouletteWheel();
    }

    function drawRouletteWheel() {
      var canvas = document.getElementById("wheelcanvas");
      if (canvas.getContext) {
        var outsideRadius = 300;
        var textRadius = 240;
        var insideRadius = 1;

        ctx = canvas.getContext("2d");
        ctx.clearRect(0,0,1000,1000);


        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;

        ctx.font = 'bold 48px sans-serif';

        for(var i = 0; i < 16; i++) {
          var angle = startAngle + i * arc;
          ctx.fillStyle = colors[i];

          ctx.beginPath();
          ctx.arc(400, 400, outsideRadius, angle, angle + arc, false);
          ctx.arc(400, 400, insideRadius, angle + arc, angle, true);
          ctx.stroke();
          ctx.fill();

          ctx.save();
          ctx.shadowOffsetX = -1;
          ctx.shadowOffsetY = -1;
          ctx.shadowBlur    = 0;
          ctx.shadowColor   = "rgb(220,220,220)";
          ctx.fillStyle = "black";
          ctx.translate(400 + Math.cos(angle + arc / 2) * textRadius, 400 + Math.sin(angle + arc / 2) * textRadius);
          ctx.rotate(angle + arc / 2 + Math.PI / 2);
          var text = virtudes[i];
          ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
          ctx.restore();
        }

        //Arrow
        ctx.fillStyle = "black";
        ctx.beginPath();
        ctx.moveTo(400 - 4, 400 - (outsideRadius + 5));
        ctx.lineTo(400 + 4, 400 - (outsideRadius + 5));
        ctx.lineTo(400 + 4, 400 - (outsideRadius - 5));
        ctx.lineTo(400 + 9, 400 - (outsideRadius - 5));
        ctx.lineTo(400 + 0, 400 - (outsideRadius - 13));
        ctx.lineTo(400 - 9, 400 - (outsideRadius - 5));
        ctx.lineTo(400 - 4, 400 - (outsideRadius - 5));
        ctx.lineTo(400 - 4, 250 - (outsideRadius + 5));
        ctx.fill();
      }
    }

    function spin() {
        $("#vlrPremio").html("");
      spinAngleStart = Math.random() * 10 + 10;
      spinTime = 0;
      spinTimeTotal = Math.random() * 3 + 4 * 1000;
      rotateWheel();
    }

    function rotateWheel() {
      spinTime += 30;
      if(spinTime >= spinTimeTotal) {
        stopRotateWheel();
        return;
      }
      var spinAngle = spinAngleStart - easeOut(spinTime, 0, spinAngleStart, spinTimeTotal);
      startAngle += (spinAngle * Math.PI / 180);
      drawRouletteWheel();
      spinTimeout = setTimeout('rotateWheel()', 30);
    }

    function stopRotateWheel() {
      clearTimeout(spinTimeout);
      var degrees = startAngle * 180 / Math.PI + 90;
      var arcd = arc * 180 / Math.PI;
      var index = Math.floor((360 - degrees % 360) / arcd);
      ctx.save();
      ctx.font = 'bold 72px sans-serif';
      var text = premios[index]
      $("#vlrPremio").html(index+1 + ' - ' + premios[index]);
      ctx.fillText(text, 400 - ctx.measureText(text).width / 2, 400 + 30);
      ctx.restore();
    }

    function easeOut(t, b, c, d) {
      var ts = (t/=d)*t;
      var tc = ts*t;
      return b+c*(tc + -3*ts + 3*t);
    }

    draw();
