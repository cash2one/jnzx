/**
 * Adobe Edge: symbol definitions
 */
(function($, Edge, compId){
//images folder
var im='images/';

var fonts = {};


var resources = [
];
var symbols = {
"stage": {
   version: "1.5.0",
   minimumCompatibleVersion: "1.5.0",
   build: "1.5.0.217",
   baseState: "Base State",
   initialState: "Base State",
   gpuAccelerate: false,
   resizeInstances: false,
   content: {
         dom: [
         {
            id:'Ellipse',
            type:'ellipse',
            rect:['37px','47px','209px','209px','auto','auto'],
            borderRadius:["50%","50%","50%","50%"],
            fill:["rgba(84,85,93,0.76)"],
            stroke:[0,"rgba(0,0,0,1)","none"],
            transform:[[],[],[],['0.7','0.7']]
         },
         {
            id:'EllipseCopy',
            type:'ellipse',
            rect:['191px','152px','209px','209px','auto','auto'],
            borderRadius:["50%","50%","50%","50%"],
            fill:["rgba(76,225,107,0.79)"],
            stroke:[0,"rgba(0,0,0,1)","none"]
         },
         {
            id:'EllipseCopy2',
            type:'ellipse',
            rect:['315px','32px','209px','209px','auto','auto'],
            borderRadius:["50%","50%","50%","50%"],
            fill:["rgba(51,214,215,0.75)"],
            stroke:[0,"rgba(0,0,0,1)","none"]
         },
         {
            id:'Text',
            type:'text',
            rect:['51px','85px','119px','36px','auto','auto'],
            text:"16,888",
            align:"center",
            font:['Arial, Helvetica, sans-serif',42,"rgba(0,0,0,1)","normal","none",""]
         },
         {
            id:'TextCopy',
            type:'text',
            rect:['51px','139px','119px','36px','auto','auto'],
            text:"案件数量",
            align:"center",
            font:['Arial, Helvetica, sans-serif',24,"rgba(0,0,0,1)","normal","none",""]
         },
         {
            id:'TextCopy3',
            type:'text',
            rect:['199px','187px','132px','36px','auto','auto'],
            text:"16,8亿",
            align:"center",
            font:['Arial, Helvetica, sans-serif',42,"rgba(0,0,0,1)","normal","none",""]
         },
         {
            id:'TextCopy2',
            type:'text',
            rect:['205px','241px','119px','36px','auto','auto'],
            text:"债务总额",
            align:"center",
            font:['Arial, Helvetica, sans-serif',24,"rgba(0,0,0,1)","normal","none",""]
         },
         {
            id:'TextCopy5',
            type:'text',
            rect:['323px','67px','132px','36px','auto','auto'],
            text:"16,8亿",
            align:"center",
            font:['Arial, Helvetica, sans-serif',42,"rgba(0,0,0,1)","normal","none",""]
         },
         {
            id:'TextCopy4',
            type:'text',
            rect:['329px','121px','119px','36px','auto','auto'],
            text:"债务总额",
            align:"center",
            font:['Arial, Helvetica, sans-serif',24,"rgba(0,0,0,1)","normal","none",""]
         }],
         symbolInstances: [

         ]
      },
   states: {
      "Base State": {
         "${_TextCopy4}": [
            ["style", "top", '121px'],
            ["style", "text-align", 'center'],
            ["style", "height", '36px'],
            ["style", "left", '329px'],
            ["style", "width", '119px']
         ],
         "${_TextCopy3}": [
            ["style", "top", '187px'],
            ["style", "text-align", 'center'],
            ["style", "height", '36px'],
            ["style", "width", '132px'],
            ["style", "left", '199px'],
            ["style", "font-size", '42px']
         ],
         "${_TextCopy5}": [
            ["style", "top", '67px'],
            ["style", "text-align", 'center'],
            ["style", "height", '36px'],
            ["style", "font-size", '42px'],
            ["style", "left", '323px'],
            ["style", "width", '132px']
         ],
         "${_EllipseCopy2}": [
            ["color", "background-color", 'rgba(51,214,215,0.75)'],
            ["transform", "scaleY", '0.7'],
            ["transform", "scaleX", '0.7'],
            ["style", "height", '209px'],
            ["style", "top", '7px'],
            ["style", "left", '284px'],
            ["style", "width", '209px']
         ],
         "${_Text}": [
            ["style", "top", '85px'],
            ["style", "text-align", 'center'],
            ["style", "height", '36px'],
            ["style", "font-size", '42px'],
            ["style", "left", '51px'],
            ["style", "width", '119px']
         ],
         "${_TextCopy2}": [
            ["style", "top", '241px'],
            ["style", "text-align", 'center'],
            ["style", "height", '36px'],
            ["style", "left", '205px'],
            ["style", "width", '119px']
         ],
         "${_Stage}": [
            ["color", "background-color", 'rgba(255,255,255,1)'],
            ["style", "width", '500px'],
            ["style", "height", '347px'],
            ["style", "overflow", 'auto']
         ],
         "${_EllipseCopy}": [
            ["color", "background-color", 'rgba(76,225,107,0.79)'],
            ["transform", "scaleY", '0.7'],
            ["transform", "scaleX", '0.7'],
            ["style", "height", '209px'],
            ["style", "top", '127px'],
            ["style", "left", '160px'],
            ["style", "width", '209px']
         ],
         "${_TextCopy}": [
            ["style", "top", '139px'],
            ["style", "text-align", 'center'],
            ["style", "height", '36px'],
            ["style", "left", '51px'],
            ["style", "width", '119px']
         ],
         "${_Ellipse}": [
            ["color", "background-color", 'rgba(84,85,93,0.76)'],
            ["transform", "scaleY", '0.7'],
            ["transform", "scaleX", '0.7'],
            ["style", "height", '209px'],
            ["style", "top", '22px'],
            ["style", "left", '6px'],
            ["style", "width", '209px']
         ]
      }
   },
   timelines: {
      "Default Timeline": {
         fromState: "Base State",
         toState: "",
         duration: 500,
         autoPlay: true,
         timeline: [
            { id: "eid25", tween: [ "style", "${_Ellipse}", "top", '22px', { fromValue: '22px'}], position: 500, duration: 0 },
            { id: "eid29", tween: [ "style", "${_EllipseCopy2}", "top", '7px', { fromValue: '7px'}], position: 500, duration: 0 },
            { id: "eid27", tween: [ "style", "${_EllipseCopy}", "top", '127px', { fromValue: '127px'}], position: 500, duration: 0 },
            { id: "eid28", tween: [ "style", "${_EllipseCopy2}", "left", '284px', { fromValue: '284px'}], position: 500, duration: 0 },
            { id: "eid24", tween: [ "style", "${_Ellipse}", "left", '6px', { fromValue: '6px'}], position: 500, duration: 0 },
            { id: "eid3", tween: [ "transform", "${_Ellipse}", "scaleX", '1', { fromValue: '0.7'}], position: 0, duration: 500 },
            { id: "eid10", tween: [ "transform", "${_EllipseCopy}", "scaleY", '1', { fromValue: '0.7'}], position: 0, duration: 500 },
            { id: "eid14", tween: [ "transform", "${_EllipseCopy2}", "scaleY", '1', { fromValue: '0.7'}], position: 0, duration: 500 },
            { id: "eid26", tween: [ "style", "${_EllipseCopy}", "left", '160px', { fromValue: '160px'}], position: 500, duration: 0 },
            { id: "eid9", tween: [ "transform", "${_EllipseCopy}", "scaleX", '1', { fromValue: '0.7'}], position: 0, duration: 500 },
            { id: "eid13", tween: [ "transform", "${_EllipseCopy2}", "scaleX", '1', { fromValue: '0.7'}], position: 0, duration: 500 },
            { id: "eid4", tween: [ "transform", "${_Ellipse}", "scaleY", '1', { fromValue: '0.7'}], position: 0, duration: 500 }         ]
      }
   }
}
};


Edge.registerCompositionDefn(compId, symbols, fonts, resources);

/**
 * Adobe Edge DOM Ready Event Handler
 */
$(window).ready(function() {
     Edge.launchComposition(compId);
});
})(jQuery, AdobeEdge, "EDGE-40653199");
