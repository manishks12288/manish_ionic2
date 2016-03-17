import {App, IonicApp, Platform, MenuController} from 'ionic-angular';
import {HelloIonicPage} from './pages/hello-ionic/hello-ionic';
import {ListPage} from './pages/list/list';
import {LoginPage} from './pages/login/login';
import {UserData} from './providers/user-data/user-data';
import {BloglistPage} from './pages/bloglist/bloglist';
import {BlogData} from './providers/blog-data/blog-data';
import {LoadingModal} from './components/loading-modal/loading-modal';
@App({
  templateUrl: 'build/app.html',
  providers: [UserData,BlogData],
  directives: [LoadingModal],
  config: {} // http://ionicframework.com/docs/v2/api/config/Config/
})
class MyApp {
  // make HelloIonicPage the root (or first) page
  rootPage: any = LoginPage;
  pages: Array<{title: string, component: any}>;
  o:any;
  node:any

  constructor(
    private app: IonicApp,
    private platform: Platform,
    private menu: MenuController
  ) {
    this.initializeApp();
    this.o = { "store": {
    "book": [ 
      { "category": "reference",
        "author": [{"details" : "great author1",
        "name":"author1" 
        },{"details" : "great authord1",
        "name":"authord1" 
        }],
        "title": "Sayings of the Century",
        "price": 8.95
      },
      { "category": "fiction",
        "author": [{"details" : "great author2",
        "name":"author2" 
        }],
        "title": "Sword of Honour",
        "price": 12.99
      },
      { "category": "fiction",
        "author": [{"details" : "great author3",
        "name":"author3" 
        }],
        "title": "Moby Dick",
        "isbn": "0-553-21311-3",
        "price": 8.99
      },
      { "category": "fiction",
        "author": [{"details" : "great author4",
        "name":"author4" 
        }],
        "title": "The Lord of the Rings",
        "isbn": "0-395-19395-8",
        "price": 22.99
      }
    ],
    "bicycle": {
      "color": "red",
      "price": 19.95
    }
  }
};  // the 'store' JSON object from above
var temp = "$.store.book[*].author";
var res1 = JSON.stringify(this.jsonPath(this.o, temp, {resultType:"VALUE"}));
    res1 = JSON.parse(res1);
    console.log(res1);
// this.node = temp.split('@');
// console.log(temp.split('@').length-1);
// console.log(temp.split('@'));
// var current;
// var next;
// if( temp.split('@').length-1 > 0){
//         current = temp.split('@')[0];
//         next = temp.split('@')[1];
//     for(let i=0; i < temp.split('@').length-1; i++){
//         this.createNode(current,next,i,1);
//         //this.getRes(current,temp.split('@')[i+1],temp.split('@').length-1);
       
//         //console.log(rec);
//     }
// }else{
//     var res1 = JSON.stringify(this.jsonPath(this.o, temp, {}));
//     res1 = JSON.parse(res1);
//     console.log(res1[0]);
// }

    // var res1 = this.jsonPath(this.o, temp, {});
    // var res2 = this.jsonPath(this.o, "$..author", {resultType:"PATH"});
    // console.log(res1);
    // console.log(res2);
    // set our app's pages
    this.pages = [
      //{ title: 'Hello Ionic', component: HelloIonicPage },
      { title: 'Group List', component: ListPage },
      { title: 'Login', component: LoginPage },
      {title: 'Bloglist', component: BloglistPage}
    ];
  }
getRes(recObject , node,length){
    var res1 = JSON.stringify(this.jsonPath(this.o, recObject, {}));
    res1 = JSON.parse(res1);
    for(let i=0; i < res1[0].length; i++){
       console.log(this.jsonPath(this.o, recObject+'['+i+']'+'.'+ node, {}));
    }
}

createNode(current,next,num,k){
     var res1 = JSON.stringify(this.jsonPath(this.o, current+ '[' + num + ']' + '.' + next, {}));
     res1 = JSON.parse(res1);
     console.log(res1);
     current = current+ '[' + num + ']' + '.' + next;
     console.log(current);
     if(res1[0].length>0 && k+1<this.node.length){
         next = this.node[k+1];
         this.createNode(current, next,num,k+1);
     }
}
  initializeApp() {
    this.platform.ready().then(() => {
      // The platform is now ready. Note: if this callback fails to fire, follow
      // the Troubleshooting guide for a number of possible solutions:
      //
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      //
      // First, let's hide the keyboard accessory bar (only works natively) since
      // that's a better default:
      //
      // Keyboard.setAccessoryBarVisible(false);
      //
      // For example, we might change the StatusBar color. This one below is
      // good for dark backgrounds and light text:
      // StatusBar.setStyle(StatusBar.LIGHT_CONTENT)
    });
  }
jsonPath(obj, expr, arg) {
   var P = {
      resultType: arg && arg.resultType || "VALUE",
      result: [],
      normalize: function(expr) {
         var subx = [];
         return expr.replace(/[\['](\??\(.*?\))[\]']|\['(.*?)'\]/g, function($0,$1,$2){return "[#"+(subx.push($1||$2)-1)+"]";})  /* http://code.google.com/p/jsonpath/issues/detail?id=4 */
                    .replace(/'?\.'?|\['?/g, ";")
                    .replace(/;;;|;;/g, ";..;")
                    .replace(/;$|'?\]|'$/g, "")
                    .replace(/#([0-9]+)/g, function($0,$1){return subx[$1];});
      },
      asPath: function(path) {
         var x = path.split(";"), p = "$";
         for (var i=1,n=x.length; i<n; i++)
            p += /^[0-9*]+$/.test(x[i]) ? ("["+x[i]+"]") : ("['"+x[i]+"']");
         return p;
      },
      store: function(p, v) {
         if (p) P.result[P.result.length] = P.resultType == "PATH" ? P.asPath(p) : v;
         return !!p;
      },
      trace: function(expr, val, path) {
         if (expr !== "") {
            var x = expr.split(";"), loc = x.shift();
            x = x.join(";");
            if (val && val.hasOwnProperty(loc))
               P.trace(x, val[loc], path + ";" + loc);
            else if (loc === "*")
               P.walk(loc, x, val, path, function(m,l,x,v,p) { P.trace(m+";"+x,v,p); });
            else if (loc === "..") {
               P.trace(x, val, path);
               P.walk(loc, x, val, path, function(m,l,x,v,p) { typeof v[m] === "object" && P.trace("..;"+x,v[m],p+";"+m); });
            }
            else if (/^\(.*?\)$/.test(loc)) // [(expr)]
               P.trace(P.eval(loc, val, path.substr(path.lastIndexOf(";")+1))+";"+x, val, path);
            else if (/^\?\(.*?\)$/.test(loc)) // [?(expr)]
               P.walk(loc, x, val, path, function(m,l,x,v,p) { if (P.eval(l.replace(/^\?\((.*?)\)$/,"$1"), v instanceof Array ? v[m] : v, m)) P.trace(m+";"+x,v,p); }); // issue 5 resolved
            else if (/^(-?[0-9]*):(-?[0-9]*):?([0-9]*)$/.test(loc)) // [start:end:step]  phyton slice syntax
               P.slice(loc, x, val, path);
            else if (/,/.test(loc)) { // [name1,name2,...]
               for (var s=loc.split(/'?,'?/),i=0,n=s.length; i<n; i++)
                  P.trace(s[i]+";"+x, val, path);
            }
         }
         else
            P.store(path, val);
      },
      walk: function(loc, expr, val, path, f) {
         if (val instanceof Array) {
            for (var i=0,n=val.length; i<n; i++)
               if (i in val)
                  f(i,loc,expr,val,path);
         }
         else if (typeof val === "object") {
            for (var m in val)
               if (val.hasOwnProperty(m))
                  f(m,loc,expr,val,path);
         }
      },
      slice: function(loc, expr, val, path) {
         if (val instanceof Array) {
            var len=val.length, start=0, end=len, step=1;
            loc.replace(/^(-?[0-9]*):(-?[0-9]*):?(-?[0-9]*)$/g, function($0,$1,$2,$3){start=parseInt($1||start);end=parseInt($2||end);step=parseInt($3||step);});
            start = (start < 0) ? Math.max(0,start+len) : Math.min(len,start);
            end   = (end < 0)   ? Math.max(0,end+len)   : Math.min(len,end);
            for (var i=start; i<end; i+=step)
               P.trace(i+";"+expr, val, path);
         }
      },
      eval: function(x, _v, _vname) {
         try { return $ && _v && eval(x.replace(/(^|[^\\])@/g, "$1_v").replace(/\\@/g, "@")); }  // issue 7 : resolved ..
         catch(e) { throw new SyntaxError("jsonPath: " + e.message + ": " + x.replace(/(^|[^\\])@/g, "$1_v").replace(/\\@/g, "@")); }  // issue 7 : resolved ..
      }
   };

   var $ = obj;
   if (expr && obj && (P.resultType == "VALUE" || P.resultType == "PATH")) {
      P.trace(P.normalize(expr).replace(/^\$;?/,""), obj, "$");  // issue 6 resolved
      return P.result.length ? P.result : false;
   }
} 
  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    let nav = this.app.getComponent('nav');
    nav.setRoot(page.component);
  }
}
