#problem statement description
Millions of eligible students and citizens miss out on scholarships and government subsidies every year due to scattered information across multiple portals, complex eligibility criteria, and lack of awareness. According to studies, over 60% of students are unaware of available schemes, and thousands of crores in funds remain unutilized annually.

The current ecosystem is fragmented  portals are difficult to navigate, eligibility rules are confusing, and applicants face repeated document submissions. This leads to frustration, application dropouts, and financial stress on families.

There is a clear need for a unified platform the aggregates all scholarship and subsidy schemes, analyzes user profiles to match eligibility, and provides step-by-step guidance making access to opportunities simpler, faster, and more transparent.



=>routes for login and register
    >api/users/login -- for login
    >api/users/register -- for register

=>routes for schemes
    >/api/schemes/get --get all schemes
    >/api/schemes//authority --get schemes based on authority
    >/api/schemes/category/:category --get schemes based on category
    >/api/schemes/authoritycategory --get schemes based on authority,category and state

=>routes for reminders
    >/api/reminders/create --create new reminder
    >/api/reminders/get/:userid --get all reminders of user
    >/api/reminders/delete/:reminderid --delete a reminder
     
