Webcam.set({
    height: 250,
    width: 350,
    image_format: 'png',
    png_quality: 90
});

camera = document.getElementById('camera').innerHTML;
Webcam.attach('#camera');

function captureImg() {
    Webcam.snap(function(data_uri) {
        document.getElementById('resultImg').innerHTML = '<img id="captured_img" src="'+data_uri+'" />';
    });
}

console.log('ml5 version', ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/PjCO3vjO2/model.json', modelLoaded);

function modelLoaded() {
    window.alert('Model has been loaded!');
}

function identifyImg() {
    image = document.getElementById('captured_img');
    classifier.classify(image, gotResult);
}

function gotResult(error, results) {
    if(error) {
        console.error(error);
    }
    else {
        console.log(results);
        document.getElementById('object_name').innerHTML = results[0].label;
        document.getElementById('object_accuracy').innerHTML = results[0].confidence.toFixed(3);
    }
}