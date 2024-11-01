
import type { CustomThemeConfig } from '@skeletonlabs/tw-plugin';

export const myCustomTheme: CustomThemeConfig = {
    name: 'my-custom-theme',
    properties: {
		// =~= Theme Properties =~=
		"--theme-font-family-base": `system-ui`,
		"--theme-font-family-heading": `system-ui`,
		"--theme-font-color-base": "0 0 0",
		"--theme-font-color-dark": "255 255 255",
		"--theme-rounded-base": "9999px",
		"--theme-rounded-container": "8px",
		"--theme-border-base": "1px",

		// =~= Theme On-X Colors =~=
		"--on-primary": "255 255 255",
		"--on-secondary": "255 255 255",
		"--on-tertiary": "0 0 0",
		"--on-success": "0 0 0",
		"--on-warning": "0 0 0",
		"--on-error": "255 255 255",
		"--on-surface": "255 255 255",

		// =~= Theme Colors =~=
		// primary | #38728a (600)
		"--color-primary-50": "241 248 250", // #f1f8fa
		"--color-primary-100": "220 238 241", // #dceef1
		"--color-primary-200": "188 220 229", // #bcdce5
		"--color-primary-300": "142 195 210", // #8ec3d2
		"--color-primary-400": "89 162 183", // #59a2b7 
		"--color-primary-500": "61 134 157", // #3d869d
		"--color-primary-600": "56 114 138", // #38728a
		"--color-primary-700": "49 90 109", // #315a6d
		"--color-primary-800": "47 77 91", // #2f4d5b
		"--color-primary-900": "43 66 78", // #2b424e
		// 950: #182934

		// secondary | #224c4d (800)
		"--color-secondary-50": "243 250 249", // #f3faf9
		"--color-secondary-100": "214 241 238", // #d6f1ee
		"--color-secondary-200": "173 226 220", // #ade2dc
		"--color-secondary-300": "125 203 199", // #7dcbc7
		"--color-secondary-400": "82 175 174", // #52afae
		"--color-secondary-500": "56 148 147", // #389493
		"--color-secondary-600": "43 116 118", // #2b7476
		"--color-secondary-700": "38 93 95", // #265d5f
		"--color-secondary-800": "34 76 77", // #224c4d
		"--color-secondary-900": "28 56 57", // #1c3839
		// 950: #0d2426

		// tertiary | #eab940 (300)
		"--color-tertiary-50": "252 248 234", // #fcf8ea
		"--color-tertiary-100": "249 239 200", // #f9efc8
		"--color-tertiary-200": "244 220 148", // #f4dc94
		"--color-tertiary-300": "234 185 64", // #eab940
		"--color-tertiary-400": "229 168 42", // #e5a82a
		"--color-tertiary-500": "214 145 28", // #d6911c
		"--color-tertiary-600": "184 111 22", // #b86f16
		"--color-tertiary-700": "147 79 21", // #934f15
		"--color-tertiary-800": "122 63 25", // #7a3f19
		"--color-tertiary-900": "104 53 27", // #68351b
		// 950: #3d1b0b

		// success | #529535 (500)
		"--color-success-50": "229 239 225", // #e5efe1
		"--color-success-100": "220 234 215", // #dcead7
		"--color-success-200": "212 229 205", // #d4e5cd
		"--color-success-300": "186 213 174", // #bad5ae
		"--color-success-400": "134 181 114", // #86b572
		"--color-success-500": "82 149 53", // #529535
		"--color-success-600": "74 134 48", // #4a8630
		"--color-success-700": "62 112 40", // #3e7028
		"--color-success-800": "49 89 32", // #315920
		"--color-success-900": "40 73 26", // #28491a

		// warning | #e0a623 (500)
		"--color-warning-50": "250 242 222", // #faf2de
		"--color-warning-100": "249 237 211", // #f9edd3
		"--color-warning-200": "247 233 200", // #f7e9c8
		"--color-warning-300": "243 219 167", // #f3dba7
		"--color-warning-400": "233 193 101", // #e9c165
		"--color-warning-500": "224 166 35", // #e0a623
		"--color-warning-600": "202 149 32", // #ca9520
		"--color-warning-700": "168 125 26", // #a87d1a
		"--color-warning-800": "134 100 21", // #866415
		"--color-warning-900": "110 81 17", // #6e5111

		// error | #c65c4e (500)
		"--color-error-50": "246 231 228", // #f6e7e4
		"--color-error-100": "244 222 220", // #f4dedc
		"--color-error-200": "241 214 211", // #f1d6d3
		"--color-error-300": "232 190 184", // #e8beb8
		"--color-error-400": "215 141 131", // #d78d83
		"--color-error-500": "198 92 78", // #c65c4e
		"--color-error-600": "178 83 70", // #b25346
		"--color-error-700": "149 69 59", // #95453b
		"--color-error-800": "119 55 47", // #77372f
		"--color-error-900": "97 45 38", // #612d26

		// surface | #ffffff
		"--color-surface-50": "255 255 255", // #ffffff
		"--color-surface-100": "239 239 239", // #efefef
		"--color-surface-200": "220 220 220", // #dcdcdc
		"--color-surface-300": "189 189 189", // #bdbdbd
		"--color-surface-400": "152 152 152", // #989898
		"--color-surface-500": "124 124 124", // #7c7c7c
		"--color-surface-600": "101 101 101", // #656565
		"--color-surface-700": "82 82 82", // #525252
		"--color-surface-800": "70 70 70", // #464646
		"--color-surface-900": "61 61 61", // #3d3d3d
		// 950: #292929

	}
}