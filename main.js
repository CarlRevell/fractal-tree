(function() {
  var angleControl, angleText, canvas, context, lengthControl, lengthText, growthControl, growthText;

  window.addEventListener('load', load);
  function load() {    
    angleControl = document.getElementById('angle');
    angleControl.min = 0;
    angleControl.max = Math.PI / 4;
    angleControl.step = Math.PI / 360;
    angleText = document.getElementById('angleText');
    lengthControl = document.getElementById('length');
    lengthText = document.getElementById('lengthText');
    growthControl = document.getElementById('growth');
    growthText = document.getElementById('growthText');    
    canvas = document.getElementById('canvas');
    context = canvas.getContext('2d');
    context.fillStyle = 'white';
    context.strokeStyle = 'hsl(30, 50%, 20%)';
    context.lineCap = 'round';
    angleControl.addEventListener('input', draw);
    lengthControl.addEventListener('input', draw);
    growthControl.addEventListener('input', draw);
    Array.from(document.querySelectorAll['input[type=range]']).forEach(input => input.addEventListener('input', draw));
    draw();
  }

  function draw(e) {
    console.log(e, this);
    if (e) {
      document.getElementById(this.id + 'Text').textContent = this.value;
    }
    
    // context.save();    
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.translate(canvas.width / 2, canvas.height);
    branch(lengthControl.value, angleControl.value, 1);
    context.setTransform(1, 0, 0, 1, 0, 0);
    // context.restore();
  }

  function lerp(min, max) {
    return Math.random() * (max - min) + min
  }

  function branch(length, angle, evo) {
    var growthFactor = parseFloat(growthControl.value)
      , lineWidth = Math.max((18 - 2 *evo) + lerp(-0.5, 0.5), 1)
      , ran;
    
    if (length <= 8 && lineWidth < 4) {
      context.strokeStyle = 'hsl(' + 120 + lerp(-20, 20) + ', 50%, ' + lerp(30, 50) + '%)';
    }
    context.lineWidth = lineWidth;
    context.beginPath();
    context.moveTo(0, 0);
    context.lineTo(0, - length);
    context.stroke();    
    if (length > 2) {
      context.translate(0, - length);
      context.save();      
      context.rotate(angle);
      ran = lerp(1 / 2 - growthFactor / 2, 1 / 2 + growthFactor / 2);
      branch(length * ran, angle, evo + 1);
      context.restore();
      context.save();
      context.rotate(-angle);
      ran = lerp(1 / 2 - growthFactor / 2, 1 / 2 + growthFactor / 2);
      branch(length * ran, -angle, evo + 1);
      context.restore();
    }    
  }
})();