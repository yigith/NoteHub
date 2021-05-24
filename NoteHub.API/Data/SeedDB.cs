using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NoteHub.API.Data
{
    public class SeedDB
    {
        public static async Task InitializeAsync(RoleManager<IdentityRole> roleManager, UserManager<ApplicationUser> userManager)
        {
            if (!await roleManager.RoleExistsAsync(Constants.Roles.ADMIN))
            {
                await roleManager.CreateAsync(new IdentityRole(Constants.Roles.ADMIN));
            }

            if (!await userManager.Users.AnyAsync(x => x.UserName == Constants.DEFAULT_EMAIL))
            {
                var user = new ApplicationUser()
                {
                    Email = Constants.DEFAULT_EMAIL,
                    UserName = Constants.DEFAULT_EMAIL
                };
                await userManager.CreateAsync(user, Constants.DEFAULT_PASSWORD);
                await userManager.AddToRoleAsync(user, Constants.Roles.ADMIN);
            }
        }
    }
}
