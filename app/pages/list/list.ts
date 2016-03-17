import {Page, IonicApp, NavController, NavParams} from 'ionic-angular';
import {ItemDetailsPage} from '../item-details/item-details';
import {UserData} from '../../providers/user-data/user-data';
import {FallbackDirective} from '../../components/fallback-directive/fallback-directive';
import * as ConfigData from '../../providers/config-data/config-data';

//http://demo.appcarvers.com/junite/index.php?option=com_api&format=raw&app=easyblog&resource=latest&key=c2ecb0c473849018bf97b67302f42caebc08ee1e&limit=5&limitstart=0&user_id=
@Page({
    templateUrl: 'build/pages/list/list.html',
     directives: [FallbackDirective]
})
export class ListPage {
    selectedItem: any;
    // icons: string[];
    //items: Array<{title: string, note: string, icon: string}>;
    itemlists: Array<{ title: string, imagesrc: string, details: string, member_count: any, category_name:string}>;
    limitstart:any;
    configs:any;
    loading:any;
    
    constructor(private nav: NavController, navParams: NavParams, private userData: UserData, private app:IonicApp) {
        // If we navigated to this page, we will have an item available as a nav param
        this.itemlists = [];
        this.selectedItem = navParams.get('item');
        this.limitstart=0;
        this.getGroupList(this.limitstart);
        this.loading = app.getComponent('loading');
        ConfigData.findAll().then(data => {this.configs = data;console.log(data);});
        //this.showLoader();
    }
    // showLoader(){
    //     this.loading.show();
    //     setTimeout(() => {
    //         this.loading.hide();
    //     }, 2000);
    // }
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
                    details: value[i].description,
                    member_count: value[i].member_count,
                    category_name: value[i].category_name
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
