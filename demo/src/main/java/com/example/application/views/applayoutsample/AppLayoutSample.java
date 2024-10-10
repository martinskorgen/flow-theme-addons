package com.example.application.views.applayoutsample;

import com.example.application.views.componentssample.ComponentsSampleView;
import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.applayout.AppLayout;
import com.vaadin.flow.component.applayout.DrawerToggle;
import com.vaadin.flow.component.html.H1;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.icon.Icon;
import com.vaadin.flow.component.icon.VaadinIcon;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.Scroller;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.sidenav.SideNav;
import com.vaadin.flow.component.sidenav.SideNavItem;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.theme.lumo.LumoUtility;

@PageTitle("App Layout Sample")
@Route("app-layout-sample")
public class AppLayoutSample extends AppLayout {

    public AppLayoutSample() {
        DrawerToggle toggle = new DrawerToggle();

        H1 title = new H1("MyApp");
        title.getStyle().set("font-size", "var(--lumo-font-size-l)")
            .set("margin", "0");

        SideNav nav = getSideNav();

        Scroller scroller = new Scroller(nav);
        scroller.setClassName(LumoUtility.Padding.SMALL);

        addToDrawer(scroller);
        addToNavbar(toggle, title);

        HorizontalLayout navExamples = new HorizontalLayout(createSideNavLabelled(), createSideNavHierarchy());
        navExamples.setPadding(true);
        navExamples.setSpacing(true);
        setContent(navExamples);
    }


    private Component createSideNavLabelled() {
        SideNav baseNav = new SideNav();
        baseNav.addItem(new SideNavItem("Dashboard", AppLayoutSample.class,
            VaadinIcon.DASHBOARD.create()));
        SideNavItem calendarLink = new SideNavItem("Calendar", "",
            VaadinIcon.CALENDAR.create());
        baseNav.addItem(calendarLink);

        Icon calendarNotification = VaadinIcon.BELL.create();
        calendarNotification.getElement().getThemeList()
            .add("badge error pill");
        calendarNotification.getStyle().set("padding", "var(--lumo-space-xs");
        calendarNotification.getElement().setAttribute("aria-label",
            "Upcoming appointment");
        calendarLink.setSuffixComponent(calendarNotification);

        SideNav messagesNav = new SideNav();
        messagesNav.setLabel("Messages");
        SideNavItem inboxLink = new SideNavItem("Inbox", "",
            VaadinIcon.INBOX.create());
        Span inboxCounter = new Span("12");
        inboxCounter.getElement().getThemeList().add("badge contrast pill");
        inboxCounter.getElement().setAttribute("aria-label",
            "12 unread messages");
        inboxLink.setSuffixComponent(inboxCounter);
        messagesNav.addItem(inboxLink);
        messagesNav.addItem(new SideNavItem("Sent", "",
            VaadinIcon.PAPERPLANE.create()));
        messagesNav.addItem(new SideNavItem("Trash", "",
            VaadinIcon.TRASH.create()));

        SideNav adminNav = new SideNav();
        adminNav.setLabel("Admin");
        adminNav.setCollapsible(true);
        adminNav.addItem(new SideNavItem("Users", "",
            VaadinIcon.GROUP.create()));
        adminNav.addItem(new SideNavItem("Permissions", "",
            VaadinIcon.KEY.create()));

        VerticalLayout navWrapper = new VerticalLayout(baseNav, messagesNav, adminNav);
        navWrapper.setSpacing(true);
        navWrapper.setWidth("320px");
        navWrapper.setHeightFull();
        navWrapper.getStyle().set("background", "var(--lumo-base-color-60pct)");
        baseNav.setWidthFull();
        messagesNav.setWidthFull();
        adminNav.setWidthFull();

        return navWrapper;
    }

    private Component createSideNavHierarchy() {
        SideNav sideNav = new SideNav();
        sideNav.addItem(new SideNavItem("Dashboard", AppLayoutSample.class,
            VaadinIcon.DASHBOARD.create()));
        SideNavItem calendarLink = new SideNavItem("Calendar", "",
            VaadinIcon.CALENDAR.create());
        sideNav.addItem(calendarLink);

        Icon calendarNotification = VaadinIcon.BELL.create();
        calendarNotification.getElement().getThemeList()
            .add("badge error pill");
        calendarNotification.getStyle().set("padding", "var(--lumo-space-xs");
        calendarNotification.getElement().setAttribute("aria-label",
            "Upcoming appointment");
        calendarLink.setSuffixComponent(calendarNotification);

        SideNavItem messagesLink = new SideNavItem("Messages", "", VaadinIcon.ENVELOPE.create());
        messagesLink.setExpanded(true);
        SideNavItem inboxLink = new SideNavItem("Inbox", "",
            VaadinIcon.INBOX.create());
        Span inboxCounter = new Span("12");
        inboxCounter.getElement().getThemeList().add("badge contrast pill");
        inboxCounter.getElement().setAttribute("aria-label",
            "12 unread messages");
        inboxLink.setSuffixComponent(inboxCounter);
        messagesLink.addItem(inboxLink);
        messagesLink.addItem(new SideNavItem("Sent", "",
            VaadinIcon.PAPERPLANE.create()));
        messagesLink.addItem(new SideNavItem("Trash", "",
            VaadinIcon.TRASH.create()));
        sideNav.addItem(messagesLink);

        SideNavItem adminSection = new SideNavItem("Admin");
        adminSection.setExpanded(true);
        adminSection.setPrefixComponent(VaadinIcon.COG.create());
        adminSection.addItem(new SideNavItem("Users", "",
            VaadinIcon.GROUP.create()));
        adminSection.addItem(new SideNavItem("Permissions", "",
            VaadinIcon.KEY.create()));
        sideNav.addItem(adminSection);

        VerticalLayout navWrapper = new VerticalLayout(sideNav);
        navWrapper.setSpacing(true);
        navWrapper.setWidth("320px");
        navWrapper.setHeightFull();
        navWrapper.getStyle().set("background", "var(--lumo-base-color-60pct)");
        sideNav.setWidthFull();

        return navWrapper;
    }

    private SideNav getSideNav() {
        SideNav sideNav = new SideNav();
        sideNav.addItem(
            new SideNavItem("Dashboard", "/dashboard",
                VaadinIcon.DASHBOARD.create()),
            new SideNavItem("Orders", "/orders", VaadinIcon.CART.create()),
            new SideNavItem("Customers", "/customers",
                VaadinIcon.USER_HEART.create()),
            new SideNavItem("Products", "/products",
                VaadinIcon.PACKAGE.create()),
            new SideNavItem("Documents", "/documents",
                VaadinIcon.RECORDS.create()),
            new SideNavItem("Tasks", "/tasks", VaadinIcon.LIST.create()),
            new SideNavItem("Analytics", "/analytics",
                VaadinIcon.CHART.create()));
        return sideNav;
    }

}