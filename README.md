# Petrodata Project Reflection

Just wrapped up the Petrodata project - what a ride! This was a two-page application featuring a dashboard and a widgets configuration page, but the complexity was in all the moving parts underneath.

## The Challenge

The project packed a punch with popup modals, complex state management, and components that needed to update entire sections of the UI. The biggest hurdle was definitely the time constraint combined with the sheer number of components that needed to be built from scratch.

## My Rookie Mistake

I completely botched the core functionality by approaching it backwards. The widgets configuration page was supposed to drive the dashboard setup, but I started building the dashboard first. Now the config page selections don't actually affect the dashboard at all - classic case of building before fully understanding the requirements!

## External Libraries and Tools

I used quite a number of libraries and tools but the most notable are TailwindCSS, ChartsJS and Lucide React

## The Fun Part

Despite the chaos and the pressure, I genuinely enjoyed being challenged like this. There's something satisfying about wrestling with complex state updates and figuring out how to make all these components talk to each other.

The project might be "concluded" but I'm definitely not done with it. I'll be tweaking and perfecting it until it actually works the way it was supposed to from the start.

## Here'a The Link

Check it out -> https://petrodata-xi.vercel.app/

## Latest upadtes

The project has been greatly improved since the last time. I have fixed my mistake of building from the Dashboard to the Widgets page. The widgets no get passed to the Dashboard though a WidgetsContext. I have also added the ThemeContext instead of using the darkMode prop everywhere in my code. only a few things left to do now. The mobile responsiveness of the cards and the functionality of any buttons left undone.

Initial build - https://petrodata-2t7w3vrek-sandiego2049s-projects.vercel.app

Current build - https://petrodata-aq5l576sh-sandiego2049s-projects.vercel.app/