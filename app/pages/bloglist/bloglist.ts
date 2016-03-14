import {Page, NavController, NavParams} from 'ionic-angular';
import {BlogData} from '../../providers/blog-data/blog-data';
//http://demo.appcarvers.com/junite/index.php?option=com_api&format=raw&app=easyblog&resource=latest&key=c2ecb0c473849018bf97b67302f42caebc08ee1e&limit=5&limitstart=0&user_id=
@Page({
    templateUrl: 'build/pages/bloglist/bloglist.html',
})
export class BloglistPage {
    selectedItem: any;
    // icons: string[];
    //items: Array<{title: string, note: string, icon: string}>;
    itemlists: Array<{ title: string, imagesrc: string, details: string }>;
    limitstart:any;
    configs:any;
    constructor(private nav: NavController, navParams: NavParams, private userData: BlogData) {
        // If we navigated to this page, we will have an item available as a nav param
        this.itemlists = [];
        this.selectedItem = navParams.get('item');
        this.limitstart=0;
        this.getBlogList(this.limitstart);
    }
    getBlogList(limitstart,events=null){
         this.userData.load(limitstart).then((value: any) => {
            if(limitstart==0){
                this.itemlists = [];
            }
            for (let i = 0; i < value.length; i++) {
                //console.log(i);
                this.itemlists.push({
                    title: value[i].title,
                    imagesrc: value[i].image.url,
                    details: value[i].textplain
                });
            }
            if(events != null)
             events.complete();
        });
    }
    doInfinite(infiniteScroll) {
         console.log('Begin async operation', infiniteScroll);
         this.limitstart += 5;
         this.getBlogList(this.limitstart,infiniteScroll);
    }
    doRefresh(refresher) {
     this.limitstart=0;
     console.log('Begin async operation', refresher);
     this.getBlogList(this.limitstart,refresher);
  }
}

//   itemTapped(event, item) {
//     this.nav.push(ItemDetailsPage, {
//       item: item
//     });
//   }
// }
