export class MenuConfig {
	public defaults: any = {
		header: {
			self: {},
			items: [
				// {section: 'Home'},
				{
					title: 'Dashboards',
					root: true,
					alignment: 'left',
					page: '/home',
					translate: 'MENU.DASHBOARD',
				},
			]
		},
		aside: {
			self: {},
			items: [
				{ section: 'Home' },
				{
					title: 'Home',
					root: true,
					icon: 'flaticon2-architecture-and-city',
					page: '/home',
					bullet: 'dot',
					id: 'default',
				},
				
				

			]
		},
	};

	public get configs(): any {
		return this.defaults;
	}
}
