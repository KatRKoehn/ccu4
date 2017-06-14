namespace photoapp.Controllers {

    export class HomeController {
      public photo;
      public photos;

      public save() {
       this.photoService.save(this.photo).then(() => {
         this.photos = this.photoService.list();
         this.photo = null;
       });
     }

     public remove(id) {
     this.photoService.remove(id).then(() => {
       this.photos = this.photoService.list();
     });
   }

      public pickFile() {
          this.photoService.pick(
              {
                mimetype: 'image/*',
                services: ['COMPUTER', 'IMAGE_SEARCH'],
                openTo: 'COMPUTER'
               },
              this.photoUploaded.bind(this)
          );
      }

      public photoUploaded(photo) {
          // save photo url to database
          this.photo = photo;
          this.$scope.$apply(); // force page to update
      }

      constructor(
        private filepickerService, private $scope: ng.IScope,
        private photoService:photoapp.Services.PhotoService,
        private $state:ng.ui.IStateService,
        private $stateParams:ng.ui.IStateParamsService
      ) {
        let photoId = $stateParams['id'];
        this.photo = photoService.get(photoId);
      }


  }


  angular.module('photoapp').controller('HomeController', HomeController);

  export class EditController {
      public photo;

      public save() {
        this.photoService.save(this.photo).then(() => {
          this.$state.go('home');
        });
      }

      constructor(
       private photoService:photoapp.Services.PhotoService,
       private $state:ng.ui.IStateService,
       private $stateParams:ng.ui.IStateParamsService
     ) {
       let photoId = $stateParams['id'];
       this.photo = photoService.get(photoId);
     }
    }

    export class AboutController {
        public message = 'Hello from the about page!';
    }

}
