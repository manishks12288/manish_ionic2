import {Page, NavController, NavParams} from 'ionic-angular';
import {ItemDetailsPage} from '../item-details/item-details';
import {UserData} from '../../providers/user-data/user-data';
import {FallbackDirective} from '../../components/fallback-directive/fallback-directive';
import * as ConfigData from '../../providers/config-data/config-data';

@Page({
    templateUrl: 'build/pages/list/list.html',
     directives: [FallbackDirective]
})
export class ListPage {
    selectedItem: any;
    // icons: string[];
    //items: Array<{title: string, note: string, icon: string}>;
    itemlists: Array<{ title: string, imagesrc: string, details: string }>;
    limitstart:any;
    configs:any;
    constructor(private nav: NavController, navParams: NavParams, private userData: UserData) {
        // If we navigated to this page, we will have an item available as a nav param
        this.itemlists = [];
        this.selectedItem = navParams.get('item');
        this.limitstart=0;
        this.getGroupList(this.limitstart);
        ConfigData.findAll().then(data => {this.configs = data;console.log(data);});
    }
    getGroupList(limitstart,events=null){
         this.userData.load(limitstart).then((value: any) => {
             console.log(this.configs[0].title);
             var title : string[] = this.configs[0].title.split('@');
             console.log(title);
            if(limitstart==0){
                this.itemlists = [];
            }
            for (let i = 0; i < value.length; i++) {
                //console.log(i);
                this.itemlists.push({
                    title: value[i].title,
                    imagesrc: value[i].avatar_medium,
                    details: value[i].description
                });
            }
            if(events != null)
             events.complete();
        });
    }
    doInfinite(infiniteScroll) {
         console.log('Begin async operation', infiniteScroll);
         this.limitstart += 10;
         this.getGroupList(this.limitstart,infiniteScroll);
    }
    doRefresh(refresher) {
     this.limitstart=0;
     console.log('Begin async operation', refresher);
     this.getGroupList(this.limitstart,refresher);
  }
}

//   itemTapped(event, item) {
//     this.nav.push(ItemDetailsPage, {
//       item: item
//     });
//   }
// }
