
(function(){function a(a,b){"use strict";var d=b?"Error in "+b+" extension->":"Error in unnamed extension",e={valid:!0,error:""};c.helper.isArray(a)||(a=[a]);for(var f=0;f<a.length;++f){var g=d+"sub-extension "+f+": ",h=a[f];if("object"!=typeof h)return e.valid=!1,e.error=g+"must be an object, but "+typeof h+" given",e;if(!c.helper.isString(h.type))return e.valid=!1,e.error=g+'property "type" must be a string, but '+typeof h.type+" given",e;var i=h.type=h.type.toLowerCase();if("language"===i&&(i=h.type="lang"),"html"===i&&(i=h.type="output"),"lang"!==i&&"output"!==i)return e.valid=!1,e.error=g+"type "+i+' is not recognized. Valid values: "lang" or "output"',e;if(h.filter){if("function"!=typeof h.filter)return e.valid=!1,e.error=g+'"filter" must be a function, but '+typeof h.filter+" given",e}else{if(!h.regex)return e.valid=!1,e.error=g+'extensions must define either a "regex" property or a "filter" method',e;if(c.helper.isString(h.regex)&&(h.regex=new RegExp(h.regex,"g")),!h.regex instanceof RegExp)return e.valid=!1,e.error=g+'"regex" property must either be a string or a RegExp object, but '+typeof h.regex+" given",e;if(c.helper.isUndefined(h.replace))return e.valid=!1,e.error=g+'"regex" extensions must implement a replace string or function',e}if(c.helper.isUndefined(h.filter)&&c.helper.isUndefined(h.regex))return e.valid=!1,e.error=g+"output extensions must define a filter property",e}return e}function b(a,b){"use strict";var c=b.charCodeAt(0);return"~E"+c+"E"}var c={},d={},e={},f={omitExtraWLInCodeBlocks:!1,prefixHeaderId:!1,noHeaderId:!1,headerLevelStart:1,parseImgDimensions:!1},g=JSON.parse(JSON.stringify(f));c.helper={},c.extensions={},c.setOption=function(a,b){"use strict";return g[a]=b,this},c.getOption=function(a){"use strict";return g[a]},c.getOptions=function(){"use strict";return g},c.resetOptions=function(){"use strict";g=JSON.parse(JSON.stringify(f))},c.getDefaultOptions=function(){"use strict";return f},c.subParser=function(a,b){"use strict";if(c.helper.isString(a)){if("undefined"==typeof b){if(d.hasOwnProperty(a))return d[a];throw Error("SubParser named "+a+" not registered!")}d[a]=b}},c.extension=function(b,d){"use strict";if(!c.helper.isString(b))throw Error("Extension 'name' must be a string");if(b=c.helper.stdExtName(b),c.helper.isUndefined(d)){if(!e.hasOwnProperty(b))throw Error("Extension named "+b+" is not registered!");return e[b]}"function"==typeof d&&(d=d()),c.helper.isArray(d)||(d=[d]);var f=a(d,b);if(!f.valid)throw Error(f.error);e[b]=d},c.getAllExtensions=function(){"use strict";return e},c.removeExtension=function(a){"use strict";delete e[a]},c.resetExtensions=function(){"use strict";e={}},c.validateExtension=function(b){"use strict";var c=a(b,null);return c.valid?!0:(console.warn(c.error),!1)},c.hasOwnProperty("helper")||(c.helper={}),c.helper.isString=function(a){"use strict";return"string"==typeof a||a instanceof String},c.helper.forEach=function(a,b){"use strict";if("function"==typeof a.forEach)a.forEach(b);else for(var c=0;c<a.length;c++)b(a[c],c,a)},c.helper.isArray=function(a){"use strict";return a.constructor===Array},c.helper.isUndefined=function(a){"use strict";return"undefined"==typeof a},c.helper.stdExtName=function(a){"use strict";return a.replace(/[_-]||\s/g,"").toLowerCase()},c.helper.escapeCharactersCallback=b,c.helper.escapeCharacters=function(a,c,d){"use strict";var e="(["+c.replace(/([\[\]\\])/g,"\\$1")+"])";d&&(e="\\\\"+e);var f=new RegExp(e,"g");return a=a.replace(f,b)},c.helper.isUndefined(console)&&(console={warn:function(a){"use strict";alert(a)},log:function(a){"use strict";alert(a)}}),c.Converter=function(b){"use strict";function f(){b=b||{};for(var a in g)g.hasOwnProperty(a)&&(j[a]=g[a]);if("object"!=typeof b)throw Error("Converter expects the passed parameter to be an object, but "+typeof b+" was passed instead.");for(var d in b)b.hasOwnProperty(d)&&(j[d]=b[d]);j.extensions&&c.helper.forEach(j.extensions,h)}function h(a){if(c.helper.isString(a)){if(a=c.helper.stdExtName(a),c.extensions[a])return console.warn("DEPRECATION WARNING: "+a+" is an old extension that uses a deprecated loading method.Please inform the developer that the extension should be updated!"),void i(c.extensions[a],a);if(c.helper.isUndefined(e[a]))throw Error('Extension "'+a+'" could not be loaded. It was either not found or is not a valid extension.');a=e[a]}if("function"==typeof a&&(a=a()),c.helper.isArray(a)||(a=[a]),c.validateExtension(a))for(var b=0;b<a.length;++b)switch(a[b].type){case"lang":k.push(a[b]);break;case"output":l.push(a[b]);break;default:throw Error("Extension loader error: Type unrecognized!!!")}}function i(b,d){"function"==typeof b&&(b=b(new c.Converter)),c.helper.isArray(b)||(b=[b]);var e=a(b,d);if(!e.valid)throw Error(e.error);for(var f=0;f<b.length;++f)switch(b[f].type){case"lang":k.push(b[f]);break;case"output":l.push(b[f]);break;default:throw Error("Extension loader error: Type unrecognized!!!")}}var j={omitExtraWLInCodeBlocks:!1,prefixHeaderId:!1,noHeaderId:!1},k=[],l=[],m=["githubCodeBlocks","hashHTMLBlocks","stripLinkDefinitions","blockGamut","unescapeSpecialChars"];f(),this.makeHtml=function(a){if(!a)return a;var b={gHtmlBlocks:[],gUrls:{},gTitles:{},gDimensions:{},gListLevel:0,hashLinkCounts:{},langExtensions:k,outputModifiers:l,converter:this};a=a.replace(/~/g,"~T"),a=a.replace(/\$/g,"~D"),a=a.replace(/\r\n/g,"\n"),a=a.replace(/\r/g,"\n"),a="\n\n"+a+"\n\n",a=c.subParser("detab")(a,j,b),a=c.subParser("stripBlankLines")(a,j,b),c.helper.forEach(k,function(d){a=c.subParser("runExtension")(d,a,j,b)});for(var e=0;e<m.length;++e){var f=m[e];a=d[f](a,j,b)}return a=a.replace(/~D/g,"$$"),a=a.replace(/~T/g,"~"),c.helper.forEach(l,function(d){a=c.subParser("runExtension")(d,a,j,b)}),a},this.setOption=function(a,b){j[a]=b},this.getOption=function(a){return j[a]},this.getOptions=function(){return j},this.addExtension=function(a){h(a)},this.useExtension=function(a){h(a)},this.removeExtension=function(a){c.helper.isArray(a)||(a=[a]);for(var b=0;b<a.length;++b){for(var d=a[b],e=0;e<k.length;++e)k[e]===d&&k[e].splice(e,1);for(var f=0;f<l.length;++e)l[f]===d&&l[f].splice(e,1)}},this.getAllExtensions=function(){return{language:k,output:l}}},c.subParser("anchors",function(a,b,d){"use strict";var e=function(a,b,e,f,g,h,i,j){c.helper.isUndefined(j)&&(j=""),a=b;var k=e,l=f.toLowerCase(),m=g,n=j;if(!m)if(l||(l=k.toLowerCase().replace(/ ?\n/g," ")),m="#"+l,c.helper.isUndefined(d.gUrls[l])){if(!(a.search(/\(\s*\)$/m)>-1))return a;m=""}else m=d.gUrls[l],c.helper.isUndefined(d.gTitles[l])||(n=d.gTitles[l]);m=c.helper.escapeCharacters(m,"*_",!1);var o='<a href="'+m+'"';return""!==n&&null!==n&&(n=n.replace(/"/g,"&quot;"),n=c.helper.escapeCharacters(n,"*_",!1),o+=' title="'+n+'"'),o+=">"+k+"</a>"};return a=a.replace(/(\[((?:\[[^\]]*\]|[^\[\]])*)\][ ]?(?:\n[ ]*)?\[(.*?)\])()()()()/g,e),a=a.replace(/(\[((?:\[[^\]]*\]|[^\[\]])*)\]\([ \t]*()<?(.*?(?:\(.*?\).*?)?)>?[ \t]*((['"])(.*?)\6[ \t]*)?\))/g,e),a=a.replace(/(\[([^\[\]]+)\])()()()()()/g,e)}),c.subParser("autoLinks",function(a){"use strict";a=a.replace(/<((https?|ftp|dict):[^'">\s]+)>/gi,'<a href="$1">$1</a>');var b=/<(?:mailto:)?([-.\w]+\@[-a-z0-9]+(\.[-a-z0-9]+)*\.[a-z]+)>/gi;return a=a.replace(b,function(a,b){var d=c.subParser("unescapeSpecialChars")(b);return c.subParser("encodeEmailAddress")(d)})}),c.subParser("blockGamut",function(a,b,d){"use strict";a=c.subParser("headers")(a,b,d);var e=c.subParser("hashBlock")("<hr />",b,d);return a=a.replace(/^[ ]{0,2}([ ]?\*[ ]?){3,}[ \t]*$/gm,e),a=a.replace(/^[ ]{0,2}([ ]?\-[ ]?){3,}[ \t]*$/gm,e),a=a.replace(/^[ ]{0,2}([ ]?\_[ ]?){3,}[ \t]*$/gm,e),a=c.subParser("lists")(a,b,d),a=c.subParser("codeBlocks")(a,b,d),a=c.subParser("blockQuotes")(a,b,d),a=c.subParser("hashHTMLBlocks")(a,b,d),a=c.subParser("paragraphs")(a,b,d)}),c.subParser("blockQuotes",function(a,b,d){"use strict";return a=a.replace(/((^[ \t]*>[ \t]?.+\n(.+\n)*\n*)+)/gm,function(a,e){var f=e;return f=f.replace(/^[ \t]*>[ \t]?/gm,"~0"),f=f.replace(/~0/g,""),f=f.replace(/^[ \t]+$/gm,""),f=c.subParser("blockGamut")(f,b,d),f=f.replace(/(^|\n)/g,"$1  "),f=f.replace(/(\s*<pre>[^\r]+?<\/pre>)/gm,function(a,b){var c=b;return c=c.replace(/^  /gm,"~0"),c=c.replace(/~0/g,"")}),c.subParser("hashBlock")("<blockquote>\n"+f+"\n</blockquote>",b,d)})}),c.subParser("codeBlocks",function(a,b,d){"use strict";a+="~0";var e=/(?:\n\n|^)((?:(?:[ ]{4}|\t).*\n+)+)(\n*[ ]{0,3}[^ \t\n]|(?=~0))/g;return a=a.replace(e,function(a,e,f){var g=e,h=f,i="\n";return g=c.subParser("outdent")(g),g=c.subParser("encodeCode")(g),g=c.subParser("detab")(g),g=g.replace(/^\n+/g,""),g=g.replace(/\n+$/g,""),b.omitExtraWLInCodeBlocks&&(i=""),g="<pre><code>"+g+i+"</code></pre>",c.subParser("hashBlock")(g,b,d)+h}),a=a.replace(/~0/,"")}),c.subParser("codeSpans",function(a){"use strict";return a=a.replace(/(^|[^\\])(`+)([^\r]*?[^`])\2(?!`)/gm,function(a,b,d,e){var f=e;return f=f.replace(/^([ \t]*)/g,""),f=f.replace(/[ \t]*$/g,""),f=c.subParser("encodeCode")(f),b+"<code>"+f+"</code>"})}),c.subParser("detab",function(a){"use strict";return a=a.replace(/\t(?=\t)/g,"    "),a=a.replace(/\t/g,"~A~B"),a=a.replace(/~B(.+?)~A/g,function(a,b){for(var c=b,d=4-c.length%4,e=0;d>e;e++)c+=" ";return c}),a=a.replace(/~A/g,"    "),a=a.replace(/~B/g,"")}),c.subParser("encodeAmpsAndAngles",function(a){"use strict";return a=a.replace(/&(?!#?[xX]?(?:[0-9a-fA-F]+|\w+);)/g,"&amp;"),a=a.replace(/<(?![a-z\/?\$!])/gi,"&lt;")}),c.subParser("encodeBackslashEscapes",function(a){"use strict";return a=a.replace(/\\(\\)/g,c.helper.escapeCharactersCallback),a=a.replace(/\\([`*_{}\[\]()>#+-.!])/g,c.helper.escapeCharactersCallback)}),c.subParser("encodeCode",function(a){"use strict";return a=a.replace(/&/g,"&amp;"),a=a.replace(/</g,"&lt;"),a=a.replace(/>/g,"&gt;"),a=c.helper.escapeCharacters(a,"*_{}[]\\",!1)}),c.subParser("encodeEmailAddress",function(a){"use strict";var b=[function(a){return"&#"+a.charCodeAt(0)+";"},function(a){return"&#x"+a.charCodeAt(0).toString(16)+";"},function(a){return a}];return a="mailto:"+a,a=a.replace(/./g,function(a){if("@"===a)a=b[Math.floor(2*Math.random())](a);else if(":"!==a){var c=Math.random();a=c>.9?b[2](a):c>.45?b[1](a):b[0](a)}return a}),a='<a href="'+a+'">'+a+"</a>",a=a.replace(/">.+:/g,'">')}),c.subParser("escapeSpecialCharsWithinTagAttributes",function(a){"use strict";var b=/(<[a-z\/!$]("[^"]*"|'[^']*'|[^'">])*>|<!(--.*?--\s*)+>)/gi;return a=a.replace(b,function(a){var b=a.replace(/(.)<\/?code>(?=.)/g,"$1`");return b=c.helper.escapeCharacters(b,"\\`*_",!1)})}),c.subParser("githubCodeBlocks",function(a,b,d){"use strict";return a+="~0",a=a.replace(/(?:^|\n)```(.*)\n([\s\S]*?)\n```/g,function(a,e,f){var g=e,h=f,i="\n";return b.omitExtraWLInCodeBlocks&&(i=""),h=c.subParser("encodeCode")(h),h=c.subParser("detab")(h),h=h.replace(/^\n+/g,""),h=h.replace(/\n+$/g,""),h="<pre><code"+(g?' class="'+g+'"':"")+">"+h+i+"</code></pre>",c.subParser("hashBlock")(h,b,d)}),a=a.replace(/~0/,"")}),c.subParser("hashBlock",function(a,b,c){"use strict";return a=a.replace(/(^\n+|\n+$)/g,""),"\n\n~K"+(c.gHtmlBlocks.push(a)-1)+"K\n\n"}),c.subParser("hashElement",function(a,b,c){"use strict";return function(a,b){var d=b;return d=d.replace(/\n\n/g,"\n"),d=d.replace(/^\n/,""),d=d.replace(/\n+$/g,""),d="\n\n~K"+(c.gHtmlBlocks.push(d)-1)+"K\n\n"}}),c.subParser("hashHTMLBlocks",function(a,b,d){"use strict";return a=a.replace(/\n/g,"\n\n"),a=a.replace(/^(<(p|div|h[1-6]|blockquote|pre|table|dl|ol|ul|script|noscript|form|fieldset|iframe|math|ins|del)\b[^\r]*?\n<\/\2>[ \t]*(?=\n+))/gm,c.subParser("hashElement")(a,b,d)),a=a.replace(/^(<(p|div|h[1-6]|blockquote|pre|table|dl|ol|ul|script|noscript|form|fieldset|iframe|math|style|section|header|footer|nav|article|aside|address|audio|canvas|figure|hgroup|output|video)\b[^\r]*?<\/\2>[ \t]*(?=\n+)\n)/gm,c.subParser("hashElement")(a,b,d)),a=a.replace(/(\n[ ]{0,3}(<(hr)\b([^<>])*?\/?>)[ \t]*(?=\n{2,}))/g,c.subParser("hashElement")(a,b,d)),a=a.replace(/(\n\n[ ]{0,3}<!(--[^\r]*?--\s*)+>[ \t]*(?=\n{2,}))/g,c.subParser("hashElement")(a,b,d)),a=a.replace(/(?:\n\n)([ ]{0,3}(?:<([?%])[^\r]*?\2>)[ \t]*(?=\n{2,}))/g,c.subParser("hashElement")(a,b,d)),a=a.replace(/\n\n/g,"\n")}),c.subParser("headers",function(a,b,d){"use strict";function e(a){var b,e=a.replace(/[^\w]/g,"").toLowerCase();return d.hashLinkCounts[e]?b=e+"-"+d.hashLinkCounts[e]++:(b=e,d.hashLinkCounts[e]=1),f===!0&&(f="section"),c.helper.isString(f)?f+b:b}var f=b.prefixHeaderId;return a=a.replace(/^(.+)[ \t]*\n=+[ \t]*\n+/gm,function(a,f){var g=c.subParser("spanGamut")(f,b,d),h=b.noHeaderId?"":' id="'+e(f)+'"',i=parseInt(b.headerLevelStart),j="<h"+i+h+">"+g+"</h"+i+">";return c.subParser("hashBlock")(j,b,d)}),a=a.replace(/^(.+)[ \t]*\n-+[ \t]*\n+/gm,function(a,f){var g=c.subParser("spanGamut")(f,b,d),h=b.noHeaderId?"":' id="'+e(f)+'"',i=parseInt(b.headerLevelStart)+1,j="<h"+i+h+">"+g+"</h"+i+">";return c.subParser("hashBlock")(j,b,d)}),a=a.replace(/^(#{1,6})[ \t]*(.+?)[ \t]*#*\n+/gm,function(a,f,g){var h=c.subParser("spanGamut")(g,b,d),i=b.noHeaderId?"":' id="'+e(g)+'"',j=parseInt(b.headerLevelStart)-1+f.length,k="<h"+j+i+">"+h+"</h"+j+">";return c.subParser("hashBlock")(k,b,d)})}),c.subParser("images",function(a,b,d){"use strict";function e(a,b,e,f,g,h,i,j){var k=d.gUrls,l=d.gTitles,m=d.gDimensions;if(e=e.toLowerCase(),j||(j=""),""===f||null===f){if((""===e||null===e)&&(e=b.toLowerCase().replace(/ ?\n/g," ")),f="#"+e,c.helper.isUndefined(k[e]))return a;f=k[e],c.helper.isUndefined(l[e])||(j=l[e]),c.helper.isUndefined(m[e])||(g=m[e].width,h=m[e].height)}b=b.replace(/"/g,"&quot;"),f=c.helper.escapeCharacters(f,"*_",!1);var n='<img src="'+f+'" alt="'+b+'"';return j&&(j=j.replace(/"/g,"&quot;"),j=c.helper.escapeCharacters(j,"*_",!1),n+=' title="'+j+'"'),g&&h&&(g="*"===g?"auto":g,h="*"===h?"auto":h,n+=' width="'+g+'"',n+=' height="'+h+'"'),n+=" />"}var f=/!\[(.*?)]\s?\([ \t]*()<?(\S+?)>?(?: =([*\d]+[A-Za-z%]{0,4})x([*\d]+[A-Za-z%]{0,4}))?[ \t]*(?:(['"])(.*?)\6[ \t]*)?\)/g,g=/!\[(.*?)][ ]?(?:\n[ ]*)?\[(.*?)]()()()()()/g;return a=a.replace(g,e),a=a.replace(f,e)}),c.subParser("italicsAndBold",function(a){"use strict";return a=a.replace(/(\*\*|__)(?=\S)([^\r]*?\S[*_]*)\1/g,"<strong>$2</strong>"),a=a.replace(/(\*|_)(?=\S)([^\r]*?\S)\1/g,"<em>$2</em>")}),c.subParser("lists",function(a,b,d){"use strict";function e(a){d.gListLevel++,a=a.replace(/\n{2,}$/,"\n"),a+="~0";var e=/(\n)?(^[ \t]*)([*+-]|\d+[.])[ \t]+([^\r]+?(\n{1,2}))(?=\n*(~0|\2([*+-]|\d+[.])[ \t]+))/gm;return a=a.replace(e,function(a,e,f,h,i){var j=c.subParser("outdent")(i,b,d);e||j.search(/\n{2,}/)>-1?j=c.subParser("blockGamut")(j,b,d):(j=c.subParser("lists")(j,b,d),j=j.replace(/\n$/,""),j=c.subParser("spanGamut")(j,b,d));var k=h.search(/[*+-]/g)>-1?"ul":"ol";return g+k+"<li>"+j+"</li>\n"}),a=a.replace(/~0/g,""),d.gListLevel--,a}function f(a,b){var c=/(<p[^>]+?>|<p>|<\/p>)/gim,d=[[]],e="",f=0;d[0].type=b;for(var g=0;g<a.length;++g){var h=a[g].slice(2),i=a[g].slice(0,2);b!==i&&(f++,d[f]=[],d[f].type=i,b=i),d[f].push(h)}for(g=0;g<d.length;++g){e+="<"+d[g].type+">\n";for(var j=0;j<d[g].length;++j)d[g].length>1&&j===d[g].length-1&&!c.test(d[g][j-1]),e+=d[g][j];e+="</"+d[g].type+">\n"}return e}var g="~1";a+="~0";var h=/^(([ ]{0,3}([*+-]|\d+[.])[ \t]+)[^\r]+?(~0|\n{2,}(?=\S)(?![ \t]*(?:[*+-]|\d+[.])[ \t]+)))/gm;return d.gListLevel?a=a.replace(h,function(a,b,c){var d=c.search(/[*+-]/g)>-1?"ul":"ol",h=e(b);h=h.replace(/\s+$/,"");var i=h.split(g);return i.shift(),h=f(i,d)}):(h=/(\n\n|^\n?)(([ ]{0,3}([*+-]|\d+[.])[ \t]+)[^\r]+?(~0|\n{2,}(?=\S)(?![ \t]*(?:[*+-]|\d+[.])[ \t]+)))/g,a=a.replace(h,function(a,b,c,d){var h=c.replace(/\n{2,}/g,"\n\n\n"),i=d.search(/[*+-]/g)>-1?"ul":"ol",j=e(h),k=j.split(g);return k.shift(),b+f(k,i)+"\n"})),a=a.replace(/~0/,"")}),c.subParser("outdent",function(a){"use strict";return a=a.replace(/^(\t|[ ]{1,4})/gm,"~0"),a=a.replace(/~0/g,"")}),c.subParser("paragraphs",function(a,b,d){"use strict";a=a.replace(/^\n+/g,""),a=a.replace(/\n+$/g,"");for(var e=a.split(/\n{2,}/g),f=[],g=e.length,h=0;g>h;h++){var i=e[h];i.search(/~K(\d+)K/g)>=0?f.push(i):i.search(/\S/)>=0&&(i=c.subParser("spanGamut")(i,b,d),i=i.replace(/^([ \t]*)/g,"<p>"),i+="</p>",f.push(i))}for(g=f.length,h=0;g>h;h++)for(;f[h].search(/~K(\d+)K/)>=0;){var j=d.gHtmlBlocks[RegExp.$1];j=j.replace(/\$/g,"$$$$"),f[h]=f[h].replace(/~K\d+K/,j)}return f.join("\n\n")}),c.subParser("runExtension",function(a,b,c,d){"use strict";if(a.filter)b=a.filter(b,d.converter,c);else if(a.regex){var e=a.regex;!e instanceof RegExp&&(e=new RegExp(e,"g")),b=b.replace(e,a.replace)}return b}),c.subParser("spanGamut",function(a,b,d){"use strict";return a=c.subParser("codeSpans")(a,b,d),a=c.subParser("escapeSpecialCharsWithinTagAttributes")(a,b,d),a=c.subParser("encodeBackslashEscapes")(a,b,d),a=c.subParser("images")(a,b,d),a=c.subParser("anchors")(a,b,d),a=c.subParser("autoLinks")(a,b,d),a=c.subParser("encodeAmpsAndAngles")(a,b,d),a=c.subParser("italicsAndBold")(a,b,d),a=a.replace(/  +\n/g," <br />\n")}),c.subParser("stripBlankLines",function(a){"use strict";return a.replace(/^[ \t]+$/gm,"")}),c.subParser("stripLinkDefinitions",function(a,b,d){"use strict";var e=/^ {0,3}\[(.+)]:[ \t]*\n?[ \t]*<?(\S+?)>?(?: =([*\d]+[A-Za-z%]{0,4})x([*\d]+[A-Za-z%]{0,4}))?[ \t]*\n?[ \t]*(?:(\n*)["|'(](.+?)["|')][ \t]*)?(?:\n+|(?=~0))/gm;return a+="~0",a=a.replace(e,function(a,e,f,g,h,i,j){return e=e.toLowerCase(),d.gUrls[e]=c.subParser("encodeAmpsAndAngles")(f),i?i+j:(j&&(d.gTitles[e]=j.replace(/"|'/g,"&quot;")),b.parseImgDimensions&&g&&h&&(d.gDimensions[e]={width:g,height:h}),"")}),a=a.replace(/~0/,"")}),c.subParser("unescapeSpecialChars",function(a){"use strict";return a=a.replace(/~E(\d+)E/g,function(a,b){var c=parseInt(b);return String.fromCharCode(c)})});var h=this;"undefined"!=typeof module&&module.exports?module.exports=c:"function"==typeof define&&define.amd?define("showdown",function(){"use strict";return c}):h.showdown=c}).call(this);
Template.editpost.events({
    'click .publish1': function(e) {
        e.preventDefault();

        var currentPostId = this._id;
        var converter = new showdown.Converter()
        var text = $('textarea').val();




        var converted = converter.makeHtml(text);
        var st = text.indexOf('//#description//') + 16;
        var end = text.indexOf('//description#//') - 16;



        var a1 = converted.indexOf("<p>//#");
        var a2 = converted.indexOf("#//</p>") + 7;
        var rem = converted.substr(a1, a2);
        converted = converted.replace(rem, "");


        var desc = text.substr(st, end);

        var postProperties = {
            title: $('.entry-title input').val(),
            md: $('textarea').val(),
            body: converted,
            description: desc
        }

        Posts.update(currentPostId, {
            $set: postProperties
        }, function(error) {
            if (error) {
                // display the error to the user
                console.log(error.reason);
            } else {
                Router.go('/dashboard', {
                    slug: Posts.find(currentPostId).slug
                });
            }
        });
    }
});