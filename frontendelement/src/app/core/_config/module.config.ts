export class ModuleConfig {
	public defaults: any = [{
		id: 8,
		title: 'Workflows',
		icon: 'flaticon2-graphic-1',
		description: " Manage your Workflows  "
	},
	{
		id: 9,
		title: 'Ticketing',
		icon: 'flaticon-open-box',
		description: " Manage tickets Raised by customer/employee "
	},
	{
		id: 10,
		title: 'Quiz',
		icon: 'flaticon-questions-circular-button',
		description: " Better Customer Engagement By Quiz  "
	},
	{
		id: 11,
		title: 'Poll',
		icon: 'flaticon2-digital-marketing',
		description: " Better Customer Engagement By Poll "
	},
	{
		id: 12,
		title: 'Employee',
		icon: 'flaticon2-avatar',
		description: "Manage your organization By Employee Module "
	},
	{
		id: 13,
		title: 'Recruitment',
		icon: 'flaticon2-avatar',
		description: " Manage your organization Recruitment By Recruitment Module  "
	},
	{
		id: 14,
		title: 'Report',
		icon: 'flaticon2-graphic-1',
		description: "Conversation Report"
	},
	{
		id: 15,
		title: 'Travel',
		icon: 'fas fa-bus-alt',
		description: "Conversation Report"
	},
	{
		id: 16,
		title: 'Leave',
		icon: 'fas fa-info-circle',
		description: "Conversation Report"
	},
	{
		id: 17,
		title: 'Hotel',
		icon: 'fas fa-hotel',
		description: "Conversation Report"
	},
	{
		id: 18,
		title: 'Testing',
		icon: 'far fa-check-circle',
		description: "Bot Testing"
	},
	{
		id: 19,
		title: 'Assesment',
		icon: 'far fa-check-circle',
		description: "Assesment"
	},
	{
		id: 20,
		title: 'Jobrole',
		icon: 'far fa-check-circle',
		description: "Jobrole"
	},
	{
		id: 21,
		title: 'Candidate',
		icon: 'flaticon2-avatar',
		description: "Candidate"
	}

	];
	public get configs(): any {
		return this.defaults;
	}
}
