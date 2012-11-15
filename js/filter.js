function Filter() {
    
}

Filter.prototype.boxBlur = function(canvas, count, strong, deep) {
    var ctx = canvas.getContext('2d');
    var width = canvas.width;
    var height = canvas.height;
    var imageData = ctx.getImageData(0, 0, width, height);
    imageData = boxBlur(imageData, width, height, count, strong, deep);
    ctx.putImageData(imageData, 0, 0);        
}

function boxBlur(image, width, height, count, strong, deep) {
    var j;
    var pix = image.data;
    console.log(pix,pix.length);
    var inner = 0;
    var outer = 0;
    var step = 0;
    var rowOrColumn;
    var nextPosition;
    var nowPosition;
    for(rowOrColumn = 0; rowOrColumn < strong; rowOrColumn++) {
        if (rowOrColumn) {
            // column blurring
            outer = width;
            inner = height;
            step = width * 4;
        } else {
            // Row blurring
            outer = height;
            inner = width;
            step = 4;
        }
        for (var i = 0; i < outer; i++) {
            // Calculate for r g b a
            nextPosition = (rowOrColumn == 0 ? (i * width * 4) : (4 * i));
            for (var k = 0; k < deep; k++) {
                nowPosition = nextPosition + k;
                var pixSum = 0;
                for(var m = 0; m < count; m++) {
                    pixSum += pix[nowPosition + step * m];
                }
                pix[nowPosition] = pix[nowPosition + step] = pix[nowPosition + step * 2] = Math.floor(pixSum/count);
                for (j = 3; j < inner-2; j++) {
                    pixSum = Math.max(0, pixSum - pix[nowPosition + (j - 2) * step] + pix[nowPosition + (j + 2) * step]);
                    pix[nowPosition + j * step] = Math.floor(pixSum/count);
                }
                pix[nowPosition + j * step] = pix[nowPosition + (j + 1) * step] = Math.floor(pixSum / count);
            }
        }
    }
    return image;
}
