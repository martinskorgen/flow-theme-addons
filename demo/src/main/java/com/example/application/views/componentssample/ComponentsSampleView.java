package com.example.application.views.componentssample;

import com.example.application.data.entity.SamplePerson;
import com.vaadin.flow.component.*;
import com.vaadin.flow.component.accordion.Accordion;
import com.vaadin.flow.component.accordion.AccordionPanel;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.button.ButtonVariant;
import com.vaadin.flow.component.checkbox.Checkbox;
import com.vaadin.flow.component.checkbox.CheckboxGroup;
import com.vaadin.flow.component.checkbox.CheckboxGroupVariant;
import com.vaadin.flow.component.combobox.ComboBox;
import com.vaadin.flow.component.combobox.MultiSelectComboBox;
import com.vaadin.flow.component.confirmdialog.ConfirmDialog;
import com.vaadin.flow.component.contextmenu.MenuItem;
import com.vaadin.flow.component.contextmenu.SubMenu;
import com.vaadin.flow.component.datepicker.DatePicker;
import com.vaadin.flow.component.datetimepicker.DateTimePicker;
import com.vaadin.flow.component.details.Details;
import com.vaadin.flow.component.details.DetailsVariant;
import com.vaadin.flow.component.dialog.Dialog;
import com.vaadin.flow.component.grid.Grid;
import com.vaadin.flow.component.grid.GridMultiSelectionModel;
import com.vaadin.flow.component.grid.GridVariant;
import com.vaadin.flow.component.grid.HeaderRow;
import com.vaadin.flow.component.grid.dataview.GridListDataView;
import com.vaadin.flow.component.html.*;
import com.vaadin.flow.component.icon.Icon;
import com.vaadin.flow.component.icon.VaadinIcon;
import com.vaadin.flow.component.listbox.MultiSelectListBox;
import com.vaadin.flow.component.menubar.MenuBar;
import com.vaadin.flow.component.messages.MessageList;
import com.vaadin.flow.component.messages.MessageListItem;
import com.vaadin.flow.component.notification.Notification;
import com.vaadin.flow.component.notification.NotificationVariant;
import com.vaadin.flow.component.orderedlayout.FlexLayout;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.page.Page;
import com.vaadin.flow.component.radiobutton.RadioButtonGroup;
import com.vaadin.flow.component.radiobutton.RadioGroupVariant;
import com.vaadin.flow.component.select.Select;
import com.vaadin.flow.component.splitlayout.SplitLayout;
import com.vaadin.flow.component.tabs.Tab;
import com.vaadin.flow.component.tabs.TabSheet;
import com.vaadin.flow.component.tabs.TabSheetVariant;
import com.vaadin.flow.component.tabs.Tabs;
import com.vaadin.flow.component.textfield.IntegerField;
import com.vaadin.flow.component.textfield.TextArea;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.component.textfield.TextFieldVariant;
import com.vaadin.flow.component.upload.Upload;
import com.vaadin.flow.component.upload.receivers.MultiFileMemoryBuffer;
import com.vaadin.flow.data.renderer.LitRenderer;
import com.vaadin.flow.data.renderer.Renderer;
import com.vaadin.flow.data.value.ValueChangeMode;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.router.RouteAlias;
import com.vaadin.flow.theme.lumo.LumoIcon;
import com.vaadin.flow.theme.lumo.LumoUtility;
import com.vaadin.flow.theme.lumo.LumoUtility.Margin;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.*;
import java.util.function.Consumer;

@PageTitle("Components Sample")
@Route(value = "components-sample")
@RouteAlias(value = "")
public class ComponentsSampleView extends VerticalLayout {

    private Checkbox persistentNotifications;

    private String forcedState;

    public ComponentsSampleView() {
        setWidthFull();
        setClassName("components-view");

        forcedState = "";
        String componentsList = "vaadin-accordion, vaadin-accordion-panel, vaadin-app-layout, vaadin-avatar, vaadin-button, vaadin-checkbox, vaadin-checkbox-group, vaadin-combo-box, vaadin-confirm-dialog, vaadin-context-menu, vaadin-crud, vaadin-custom-field, vaadin-date-picker, vaadin-date-time-picker, vaadin-details, vaadin-dialog, vaadin-email-field, vaadin-grid, vaadin-grid-pro, vaadin-integer-field, vaadin-item, vaadin-list-box, vaadin-login-form, vaadin-menu-bar, vaadin-menu-bar-button, vaadin-message-input, vaadin-message-list, vaadin-multi-select-combo-box, vaadin-notification, vaadin-number-field, vaadin-password-field, vaadin-progress-bar, vaadin-radio-button, vaadin-radio-group, vaadin-rich-text-editor, vaadin-scroller, vaadin-select:not([class='state-select']), vaadin-split-layout, vaadin-tabs, vaadin-tab, vaadin-text-area, vaadin-text-field, vaadin-time-picker, vaadin-tooltip, vaadin-tree-grid, vaadin-upload";

        Span separatorComponents = new Span("All components");
        separatorComponents.addClassNames(LumoUtility.FontSize.XXSMALL, LumoUtility.TextColor.SECONDARY, LumoUtility.Padding.Horizontal.SMALL);
        Span separatorInputs = new Span("Input fields");
        separatorInputs.addClassNames(LumoUtility.FontSize.XXSMALL, LumoUtility.TextColor.SECONDARY, LumoUtility.Padding.Horizontal.SMALL);

        Select<String> state = new Select<>();
        state.addClassName("state-select");
        state.setLabel("Force component state");
        state.setItems("default", "disabled", "focused", "focus-ring", "readonly", "invalid", "required");
        state.addComponentAtIndex(0, separatorComponents);
        state.addComponentAtIndex(5, separatorInputs);
        state.addValueChangeListener(e -> {
            Page page = UI.getCurrent().getPage();
            page.executeJs("const components = document.querySelectorAll($1);"
                + "console.log(components);"
                + "components.forEach((component) => {"
                +   "component.removeAttribute($0, '')"
                + "});", forcedState, componentsList);
            forcedState = e.getValue();
            page.executeJs("const components = document.querySelectorAll($1);"
                + "console.log(components);"
                + "components.forEach((component) => {"
                +   "component.setAttribute($0, '')"
                + "});", forcedState, componentsList);
        });

        HorizontalLayout viewHeader = new HorizontalLayout();
        viewHeader.setWidthFull();
        viewHeader.setAlignItems(Alignment.CENTER);
        H1 h1 = new H1("Components");
        h1.setClassName(LumoUtility.Padding.NONE);
        Paragraph description = new Paragraph("Component testing UI");
        description.addClassNames(Margin.Top.NONE, Margin.Bottom.SMALL, LumoUtility.TextColor.SECONDARY);
        VerticalLayout headerText = new VerticalLayout(h1, description);
        headerText.setSpacing(false);
        headerText.setPadding(false);
        headerText.setWidthFull();
        viewHeader.add(headerText, state);

        FlexLayout col1 = new FlexLayout();
        col1.setFlexDirection(FlexLayout.FlexDirection.COLUMN);
        col1.addClassNames(LumoUtility.Gap.LARGE);
        col1.setWidthFull();
        col1.add(createButtonExamples());
        col1.add(createFieldExamples());
        col1.add(createAccordionListboxExamples());
        col1.add(createTypographyExample());

        FlexLayout col2 = new FlexLayout();
        col2.setFlexDirection(FlexLayout.FlexDirection.COLUMN);
        col2.addClassNames(LumoUtility.Gap.LARGE);
        col2.setWidthFull();
        col2.add(createGridExample());
        col2.add(createBadgesNotificationsExample());
        col2.add(createTabsExample());
        col2.add(createMessagesExample());

        HorizontalLayout content = new HorizontalLayout(col1, col2);
        content.setWidthFull();
        content.addClassName("view-content");
        content.addClassName(LumoUtility.Gap.LARGE);

        add(viewHeader, content);
    }

    private Component createButtonExamples() {
        H3 menuBarHeading = new H3("Menu Bar");
        menuBarHeading.addClassName(LumoUtility.Padding.Top.LARGE);

        MenuBar menuBar = new MenuBar();
        MenuItem primary = menuBar.addItem("Primary");
        primary.addThemeNames("primary");
        menuBar.addItem("Default");
        MenuItem tertiary = menuBar.addItem("Tertiary");
        tertiary.addThemeNames("tertiary");

        MenuItem share = menuBar.addItem("Menu");
        SubMenu subMenu = share.getSubMenu();
        MenuItem secondLevel = subMenu.addItem("Second level");
        SubMenu secondLevelMenu = secondLevel.getSubMenu();
        secondLevelMenu.addItem("Menu item");
        secondLevelMenu.addItem("Menu item");
        secondLevelMenu.addItem("Menu item");
        subMenu.addItem("Menu item").setCheckable(true);
        subMenu.addItem("Menu item").setCheckable(true);
        subMenu.addItem("Menu item").setCheckable(true);

        MenuItem iconButton = menuBar.addItem(VaadinIcon.TRASH.create());
        iconButton.setAriaLabel("Remove");
        iconButton.addThemeNames("icon error");

        return createCard("Buttons", LumoUtility.Gap.SMALL,
            generateButtonVariants(),
            generateButtonVariants(ButtonVariant.LUMO_ERROR),
            generateButtonVariants(ButtonVariant.LUMO_SUCCESS),
            generateButtonVariants(ButtonVariant.LUMO_CONTRAST),
            menuBarHeading,
            menuBar);
    }

    private HorizontalLayout generateButtonVariants() {
        HorizontalLayout buttons = new HorizontalLayout();
        buttons.addClassName(LumoUtility.FlexWrap.WRAP);

        Button primaryButton = new Button("Primary");
        primaryButton.addThemeVariants(ButtonVariant.LUMO_PRIMARY);

        Button secondaryButton = new Button("Secondary");

        Button tertiaryButton = new Button("Tertiary");
        tertiaryButton.addThemeVariants(ButtonVariant.LUMO_TERTIARY);

        Button inlineTertiaryButton = new Button("Inline");
        inlineTertiaryButton.addThemeVariants(ButtonVariant.LUMO_TERTIARY_INLINE);

        Button primaryIconButton = new Button();
        primaryIconButton.addThemeVariants(ButtonVariant.LUMO_PRIMARY);
        primaryIconButton.setIcon(LumoIcon.SEARCH.create());

        Button secondaryIconButton = new Button();
        secondaryIconButton.setIcon(LumoIcon.SEARCH.create());

        Button tertiaryIconButton = new Button();
        tertiaryIconButton.addThemeVariants(ButtonVariant.LUMO_TERTIARY);
        tertiaryIconButton.setIcon(LumoIcon.SEARCH.create());

        Button inlineTertiaryIconButton = new Button();
        inlineTertiaryIconButton.addThemeVariants(ButtonVariant.LUMO_TERTIARY_INLINE);
        inlineTertiaryIconButton.setIcon(LumoIcon.SEARCH.create());

        buttons.add(new HorizontalLayout(primaryButton, secondaryButton, tertiaryButton, inlineTertiaryButton),
            new HorizontalLayout(primaryIconButton, secondaryIconButton, tertiaryIconButton, inlineTertiaryIconButton));
        return buttons;
    }
    private HorizontalLayout generateButtonVariants(ButtonVariant variant) {
        HorizontalLayout buttons = new HorizontalLayout();
        buttons.addClassName(LumoUtility.FlexWrap.WRAP);

        Button primaryButton = new Button("Primary");
        primaryButton.addThemeVariants(ButtonVariant.LUMO_PRIMARY);
        primaryButton.addThemeVariants(variant);

        Button secondaryButton = new Button("Secondary");
        secondaryButton.addThemeVariants(variant);

        Button tertiaryButton = new Button("Tertiary");
        tertiaryButton.addThemeVariants(ButtonVariant.LUMO_TERTIARY);
        tertiaryButton.addThemeVariants(variant);

        Button inlineTertiaryButton = new Button("Inline");
        inlineTertiaryButton.addThemeVariants(ButtonVariant.LUMO_TERTIARY_INLINE);
        inlineTertiaryButton.addThemeVariants(variant);

        Button primaryIconButton = new Button();
        primaryIconButton.addThemeVariants(ButtonVariant.LUMO_PRIMARY);
        primaryIconButton.setIcon(LumoIcon.SEARCH.create());
        primaryIconButton.addThemeVariants(variant);

        Button secondaryIconButton = new Button();
        secondaryIconButton.setIcon(LumoIcon.SEARCH.create());
        secondaryIconButton.addThemeVariants(variant);

        Button tertiaryIconButton = new Button();
        tertiaryIconButton.addThemeVariants(ButtonVariant.LUMO_TERTIARY);
        tertiaryIconButton.setIcon(LumoIcon.SEARCH.create());
        tertiaryIconButton.addThemeVariants(variant);

        Button inlineTertiaryIconButton = new Button();
        inlineTertiaryIconButton.addThemeVariants(ButtonVariant.LUMO_TERTIARY_INLINE);
        inlineTertiaryIconButton.setIcon(LumoIcon.SEARCH.create());
        inlineTertiaryIconButton.addThemeVariants(variant);

        buttons.add(new HorizontalLayout(primaryButton, secondaryButton, tertiaryButton, inlineTertiaryButton),
            new HorizontalLayout(primaryIconButton, secondaryIconButton, tertiaryIconButton, inlineTertiaryIconButton));
        return buttons;
    }

    private Component createFieldExamples() {
        HorizontalLayout layout = new HorizontalLayout();
        layout.addClassName(LumoUtility.Gap.LARGE);

        VerticalLayout left = new VerticalLayout();
        left.setPadding(false);
        left.addClassName(LumoUtility.Gap.SMALL);
        VerticalLayout right = new VerticalLayout();
        right.setPadding(false);
        right.addClassName(LumoUtility.Gap.SMALL);

        TextField basic = new TextField("Field");
        basic.setWidthFull();

        TextField trailingContent = new TextField("Read-only");
        trailingContent.setSuffixComponent(new Div(new Text("EUR €")));
        trailingContent.setValue("500.00");
        trailingContent.setReadOnly(true);
        trailingContent.setWidthFull();

        TextField leadingIcon = new TextField("Invalid");
        leadingIcon.setPlaceholder("Leading icon");
        leadingIcon.setPrefixComponent(LumoIcon.PHONE.create());
        leadingIcon.setValue("12345678");
        leadingIcon.setErrorMessage("Invalid phone number");
        leadingIcon.setInvalid(true);
        leadingIcon.setWidthFull();

        TextField supportiveText = new TextField("Focused");
        supportiveText.setHelperText("Helper text");
        supportiveText.setPlaceholder("Placeholder");
        supportiveText.getElement().setAttribute("focus-ring", "");
        supportiveText.setWidthFull();

        TextField disabledField = new TextField("Disabled");
        disabledField.setValue("Value");
        disabledField.setEnabled(false);
        disabledField.setWidthFull();

        IntegerField integerField = new IntegerField("Number field");
        integerField.setHelperText("Max 10 items");
        integerField.setMin(0);
        integerField.setMax(10);
        integerField.setValue(2);
        integerField.setStepButtonsVisible(true);
        integerField.setWidthFull();

        int charLimit = 140;
        TextArea textArea = new TextArea();
        textArea.setLabel("Comment");
        textArea.setMaxLength(charLimit);
        textArea.setValueChangeMode(ValueChangeMode.EAGER);
        textArea.addValueChangeListener(e -> {
            e.getSource()
                .setHelperText(e.getValue().length() + "/" + charLimit);
        });
        textArea.setValue("You've got some nice components there!");
        textArea.setWidthFull();

        ComboBox<String> comboBox = new ComboBox<>("Combo Box");
        comboBox.setAllowCustomValue(true);
        comboBox.setItems("Item 1", "Item 2", "Item 3", "Item 4");
        comboBox.setPlaceholder("Select an option");
        comboBox.setWidthFull();

        MultiSelectComboBox<String> multiSelectComboBox = new MultiSelectComboBox<>("Multiselect");
        multiSelectComboBox.setWidth("300px");
        multiSelectComboBox.setAllowCustomValue(true);
        multiSelectComboBox.setItems("Item 1", "Item 2", "Item 3", "Item 4", "Item 5", "Item 6", "Item 7", "Item 8", "Item 9", "Item 10");
        multiSelectComboBox.setValue("Item 2", "Item 5", "Item 6");
        multiSelectComboBox.setPlaceholder("Select an options");
        multiSelectComboBox.setWidthFull();

        Select<String> select = new Select<>();
        select.setLabel("Select");
        select.setItems("Item 1", "Item 2", "Item 3", "Item 4");
        select.setWidthFull();

        DatePicker datePicker = new DatePicker("Date Picker");
        datePicker.setPlaceholder("MM/DD/YYYY");
        datePicker.setLocale(Locale.US);
        datePicker.setWidthFull();

        DateTimePicker dateTimePicker = new DateTimePicker("Date Time Picker");
        dateTimePicker.setValue(LocalDateTime.now());
        dateTimePicker.setWidthFull();

        RadioButtonGroup<String> radioGroupVertical = new RadioButtonGroup<>();
        radioGroupVertical.addThemeVariants(RadioGroupVariant.LUMO_VERTICAL);
        radioGroupVertical.setLabel("Radio Buttons");
        radioGroupVertical.setItems("Item 1", "Item 2", "Item 3");
        radioGroupVertical.setValue("Item 1");

        CheckboxGroup<String> checkboxGroupVertical = new CheckboxGroup<>();
        checkboxGroupVertical.addThemeVariants(CheckboxGroupVariant.LUMO_VERTICAL);
        checkboxGroupVertical.setLabel("Checkboxes");
        checkboxGroupVertical.setItems("Item 1", "Item 2", "Item 3");
        checkboxGroupVertical.select("Item 1");

        left.add(basic, trailingContent, leadingIcon, supportiveText, disabledField, integerField, textArea);
        right.add(comboBox, multiSelectComboBox, select, datePicker, dateTimePicker, radioGroupVertical, checkboxGroupVertical);
        layout.add(left, right);
        return createCard("Input fields", layout);
    }

    private Component createAccordionListboxExamples() {
        Accordion accordion = new Accordion();

        VerticalLayout personalInformationLayout = new VerticalLayout();
        personalInformationLayout.setSpacing(false);
        personalInformationLayout.add(new Span("Sophia Williams"));
        personalInformationLayout.add(new Span("sophia.williams@company.com"));
        personalInformationLayout.add(new Span("(501) 555-9128"));
        AccordionPanel personalPanel = accordion.add("Personal information", personalInformationLayout);

        VerticalLayout billingAddressLayout = new VerticalLayout();
        billingAddressLayout.setSpacing(false);
        billingAddressLayout.add(new Span("4027 Amber Lake Canyon"));
        billingAddressLayout.add(new Span("72333-5884 Cozy Nook"));
        billingAddressLayout.add(new Span("Arkansas"));
        AccordionPanel billingPanel = accordion.add("Billing address", billingAddressLayout);

        VerticalLayout paymentLayout = new VerticalLayout();
        paymentLayout.setSpacing(false);
        paymentLayout.add(new Span("Mastercard"));
        paymentLayout.add(new Span("1234 5678 9012 3456"));
        paymentLayout.add(new Span("Expires 06/21"));
        AccordionPanel paymentPanel = accordion.add("Payment", paymentLayout);

        VerticalLayout detailsContent = new VerticalLayout();
        detailsContent.setSpacing(false);
        detailsContent.add(new Span("Mark Williams"));
        detailsContent.add(new Span("mark.williams@company.com"));
        detailsContent.add(new Span("(501) 555-1584"));

        Details details = new Details("Contact information", detailsContent);

        MenuBar accordionVariantMenu = new MenuBar();
        accordionVariantMenu.addClassName(Margin.Left.AUTO);
        MenuItem item = accordionVariantMenu.addItem("Set variant");
        SubMenu subMenu = item.getSubMenu();

        for (DetailsVariant value : DetailsVariant.values()) {
            MenuItem menuItem = subMenu.addItem(value.getVariantName(), e -> {
                if (e.getSource().isChecked()) {
                    personalPanel.addThemeVariants(value);
                    billingPanel.addThemeVariants(value);
                    paymentPanel.addThemeVariants(value);
                    details.addThemeVariants(value);
                } else {
                    personalPanel.removeThemeVariants(value);
                    billingPanel.removeThemeVariants(value);
                    paymentPanel.removeThemeVariants(value);
                    details.removeThemeVariants(value);
                }
            });
            menuItem.setCheckable(true);
        }

        HorizontalLayout accordionHeader = new HorizontalLayout();
        accordionHeader.setAlignItems(Alignment.BASELINE);
        accordionHeader.add(new H3("Accordion & Detail"));
        accordionHeader.add(accordionVariantMenu);

        SplitLayout splitLayout = new SplitLayout(SplitLayout.Orientation.HORIZONTAL);
        splitLayout.addToPrimary(accordion);
        accordion.addClassNames(LumoUtility.AlignSelf.START, Margin.Right.SMALL);
        splitLayout.addToSecondary(details);
        details.addClassNames(LumoUtility.AlignSelf.START, Margin.Left.SMALL);

        MultiSelectListBox<String> listBox = new MultiSelectListBox<>();
        listBox.setItems("Item 1", "Item 2", "Item 3", "Item 4", "Item 5");
        listBox.addComponents("Item 3", new Hr());
        listBox.select("Item 1", "Item 2");
        listBox.setItemEnabledProvider(lbItem -> !lbItem.equals("Item 5"));
        add(listBox);

        H3 listBoxHeading = new H3("List Box");
        listBoxHeading.addClassName(LumoUtility.Padding.Top.MEDIUM);

        return createCard(accordionHeader, splitLayout, listBoxHeading, listBox);
    }

    private Component createGridExample() {
        List<SamplePerson> people = getPeople();

        Grid<SamplePerson> grid = new Grid<>(SamplePerson.class, false);
        grid.setSelectionMode(Grid.SelectionMode.MULTI);
        ((GridMultiSelectionModel<?>) grid
            .setSelectionMode(Grid.SelectionMode.MULTI))
            .setSelectionColumnFrozen(true);
        Grid.Column<SamplePerson> nameColumn = grid.addColumn(SamplePerson::getName).setHeader("Name").setAutoWidth(true).setFrozen(true).setResizable(true).setSortable(true);
        Grid.Column<SamplePerson> emailColumn = grid.addColumn(SamplePerson::getEmail).setHeader("Email").setAutoWidth(true).setResizable(true);
        Grid.Column<SamplePerson> professionColumn = grid.addColumn(SamplePerson::getOccupation).setHeader("Profession").setAutoWidth(true).setResizable(true);
        grid.setItems(people);
        grid.select(people.get(2));
        grid.setHeight("320px");
        grid.setItemDetailsRenderer(createItemRenderer(grid));

        GridListDataView<SamplePerson> dataView = grid.setItems(people);
        PersonFilter personFilter = new PersonFilter(dataView);

        grid.getHeaderRows().clear();
        HeaderRow headerRow = grid.appendHeaderRow();

        headerRow.getCell(nameColumn).setComponent(
            createFilterHeader(personFilter::setName));
        headerRow.getCell(emailColumn).setComponent(
            createFilterHeader(personFilter::setEmail));
        headerRow.getCell(professionColumn).setComponent(
            createFilterHeader(personFilter::setProfession));

        MenuBar gridVariantMenu = new MenuBar();
        gridVariantMenu.addClassName(Margin.Left.AUTO);
        MenuItem item = gridVariantMenu.addItem("Set variant");
        SubMenu subMenu = item.getSubMenu();

        for (GridVariant value : GridVariant.values()) {
            if (!value.equals(GridVariant.MATERIAL_COLUMN_DIVIDERS)) {
                MenuItem menuItem = subMenu.addItem(value.getVariantName(), e -> {
                    if (e.getSource().isChecked()) {
                        grid.addThemeVariants(value);
                    } else {
                        grid.removeThemeVariants(value);
                    }
                });
                menuItem.setCheckable(true);
            }
        }

        HorizontalLayout header = new HorizontalLayout();
        header.setAlignItems(Alignment.BASELINE);
        header.add(new H3("Grid"));
        header.add(gridVariantMenu);

        return createCard(header, grid);
    }

    private static Component createFilterHeader(Consumer<String> filterChangeConsumer) {
        TextField textField = new TextField();
        textField.setValueChangeMode(ValueChangeMode.EAGER);
        textField.setClearButtonVisible(true);
        textField.addThemeVariants(TextFieldVariant.LUMO_SMALL);
        textField.setWidthFull();
        textField.getStyle().set("max-width", "100%");
        textField.addValueChangeListener(
            e -> filterChangeConsumer.accept(e.getValue()));

        return textField;
    }

    private static class PersonFilter {
        private final GridListDataView<SamplePerson> dataView;

        private String name;
        private String email;
        private String profession;

        public PersonFilter(GridListDataView<SamplePerson> dataView) {
            this.dataView = dataView;
            this.dataView.addFilter(this::test);
        }

        public void setName(String name) {
            this.name = name;
            this.dataView.refreshAll();
        }

        public void setEmail(String email) {
            this.email = email;
            this.dataView.refreshAll();
        }

        public void setProfession(String profession) {
            this.profession = profession;
            this.dataView.refreshAll();
        }

        public boolean test(SamplePerson person) {
            boolean matchesName = matches(person.getName(), name);
            boolean matchesEmail = matches(person.getEmail(), email);
            boolean matchesProfession = matches(person.getOccupation(),
                profession);

            return matchesName && matchesEmail && matchesProfession;
        }

        private boolean matches(String value, String searchTerm) {
            return searchTerm == null || searchTerm.isEmpty()
                || value.toLowerCase().contains(searchTerm.toLowerCase());
        }
    }

    private static Renderer<SamplePerson> createItemRenderer(Grid<SamplePerson> grid) {
        return LitRenderer.<SamplePerson> of("<h3>Item details</h3>"
            + "<p>Description</p>");
    }

    private Component createBadgesNotificationsExample() {
        return createCard("", LumoUtility.Gap.XLARGE, createBadgesExample(), createNotificationsExample(), createDialogExample());
    }

    private Component createTabsExample() {
        TabSheet tabSheet = new TabSheet();
        tabSheet.addThemeVariants(TabSheetVariant.LUMO_BORDERED, TabSheetVariant.LUMO_TABS_CENTERED);
        tabSheet.add("First tab", new Div(new Text("This is first tab")));
        tabSheet.add("Second tab", new Div(new Text("This is second tab")));
        tabSheet.add("Third tab", new Div(new Text("This is third tab")));

        Tab tab1 = new Tab(new Span("First tab"), createBadge(3));
        Tab tab2 = new Tab("Second tab");
        Tab tab3 = new Tab("Third tab");
        Tab tab4 = new Tab("Fourth tab");
        tab4.setEnabled(false);

        Tabs horizontalTabs = new Tabs(tab1, tab2, tab3, tab4);
        horizontalTabs.setSelectedTab(tab1);

        Tab tab5 = new Tab(new Span("First tab"), createBadge(3));
        Tab tab6 = new Tab("Second tab");
        Tab tab7 = new Tab("Third tab");
        Tab tab8 = new Tab("Fourth tab");
        tab8.setEnabled(false);

        Tabs verticalTabs = new Tabs(tab5, tab6, tab7, tab8);
        verticalTabs.setSelectedTab(tab5);
        verticalTabs.setOrientation(Tabs.Orientation.VERTICAL);

        return createCard("Tabs", tabSheet, horizontalTabs, verticalTabs);
    }

    private Span createBadge(int value) {
        Span badge = new Span(String.valueOf(value));
        badge.getElement().getThemeList().add("badge small contrast pill");
        badge.addClassName(Margin.Left.SMALL);
        return badge;
    }

    private Component createBadgesExample() {
        FlexLayout layout = new FlexLayout();
        layout.setFlexDirection(FlexLayout.FlexDirection.COLUMN);
        layout.addClassNames(LumoUtility.Gap.MEDIUM);

        FlexLayout normalBadges = new FlexLayout();
        normalBadges.addClassNames(LumoUtility.Gap.SMALL);
        FlexLayout primaryBadges = new FlexLayout();
        primaryBadges.addClassNames(LumoUtility.Gap.SMALL);

        Span none = new Span("Default");
        none.getElement().getThemeList().add("badge");

        Span success = new Span("Success");
        success.getElement().getThemeList().add("badge success");

        Span error = new Span("Error");
        error.getElement().getThemeList().add("badge error");

        Span warning = new Span("Contrast");
        warning.getElement().getThemeList().add("badge warning");

        Span contrast = new Span("Contrast");
        contrast.getElement().getThemeList().add("badge contrast");

        Span nonePrimary = new Span("Default");
        nonePrimary.getElement().getThemeList().add("badge primary");

        Span successPrimary = new Span("Success");
        successPrimary.getElement().getThemeList().add("badge success primary");

        Span errorPrimary = new Span("Error");
        errorPrimary.getElement().getThemeList().add("badge error primary");

        Span warningPrimary = new Span("Contrast");
        warningPrimary.getElement().getThemeList().add("badge warning primary");

        Span contrastPrimary = new Span("Contrast");
        contrastPrimary.getElement().getThemeList().add("badge contrast primary");


        normalBadges.add(none, success, error, warning, contrast);
        primaryBadges.add(nonePrimary, successPrimary, errorPrimary, warningPrimary, contrastPrimary);
        layout.add(new H3("Badges"), normalBadges, primaryBadges);
        return layout;
    }

    private Component createNotificationsExample() {
        FlexLayout layout = new FlexLayout();
        layout.setFlexDirection(FlexLayout.FlexDirection.COLUMN);
        layout.addClassNames(LumoUtility.Gap.MEDIUM);

        persistentNotifications = new Checkbox("Auto-close");
        persistentNotifications.setValue(true);
        persistentNotifications.addClassName(Margin.Left.AUTO);

        HorizontalLayout notificationsHeader = new HorizontalLayout();
        notificationsHeader.add(new H3("Notifications"), persistentNotifications);

        HorizontalLayout buttons = new HorizontalLayout();
        buttons.addClassNames(LumoUtility.Gap.SMALL, LumoUtility.FlexWrap.WRAP);
        buttons.add(
            createNotificationButton("Default"),
            createNotificationButton("Primary", NotificationVariant.LUMO_PRIMARY, ButtonVariant.LUMO_PRIMARY),
            createNotificationButton("Error", NotificationVariant.LUMO_ERROR, ButtonVariant.LUMO_ERROR),
            createNotificationButton("Success", NotificationVariant.LUMO_SUCCESS, ButtonVariant.LUMO_SUCCESS),
            createNotificationButton("Warning", NotificationVariant.LUMO_WARNING, ButtonVariant.LUMO_ERROR),
            createNotificationButton("Contrast", NotificationVariant.LUMO_CONTRAST, ButtonVariant.LUMO_CONTRAST)
        );

        layout.add(notificationsHeader, buttons);
        return layout;
    }

    private Button createNotificationButton(String buttonLabel, NotificationVariant notificationVariant, ButtonVariant buttonVariant) {
        Button notificationButton = new Button(buttonLabel);
        if (buttonVariant != ButtonVariant.LUMO_PRIMARY) {
            notificationButton.addThemeVariants(buttonVariant);
        }
        notificationButton.addClickListener(e -> {
            Notification notification = Notification.show("This is " + notificationVariant.getVariantName() + " notification");
            notification.addThemeVariants(notificationVariant);
            if (persistentNotifications.getValue() == true) {
                notification.setDuration(5000);
            } else {
                Button closeButton = new Button(new Icon("lumo", "cross"));
                closeButton.addThemeVariants(ButtonVariant.LUMO_TERTIARY_INLINE);
                closeButton.getElement().setAttribute("aria-label", "Close");
                closeButton.addClickListener(event -> {
                    notification.close();
                });
                notification.add(new Text("This is " + notificationVariant.getVariantName() + " notification"), closeButton);
                notification.setDuration(0);
            }
        });
        notificationButton.setTooltipText("This button triggers " + notificationVariant.getVariantName() + " notification");

        return notificationButton;
    }

    private Button createNotificationButton(String buttonLabel) {
        Button notificationButton = new Button(buttonLabel);
        notificationButton.addClickListener(e -> {
            Notification notification = Notification.show("This is default notification");
            if (persistentNotifications.getValue() == true) {
                notification.setDuration(5000);
            } else {
                Button closeButton = new Button(new Icon("lumo", "cross"));
                closeButton.addThemeVariants(ButtonVariant.LUMO_TERTIARY_INLINE);
                closeButton.getElement().setAttribute("aria-label", "Close");
                closeButton.addClickListener(event -> {
                    notification.close();
                });
                notification.add(new Text("This is default notification"), closeButton);
                notification.setDuration(0);
            }
        });
        notificationButton.setTooltipText("This button triggers a default notification and has very long tooltip to inform about it");

        return notificationButton;
    }

    private Component createDialogExample() {
        FlexLayout layout = new FlexLayout();
        layout.setFlexDirection(FlexLayout.FlexDirection.COLUMN);
        layout.addClassNames(LumoUtility.Gap.MEDIUM);

        HorizontalLayout buttons = new HorizontalLayout();
        buttons.addClassNames(LumoUtility.Gap.SMALL, LumoUtility.FlexWrap.WRAP);
        buttons.add(createDialogButton("Open dialog"), createConfirmDialogButton("Open confirm dialog"));

        layout.add(new H3("Dialogs"), buttons);
        return layout;
    }

    private Button createDialogButton(String buttonLabel) {
        Button dialogButton = new Button(buttonLabel);
        dialogButton.addClickListener(e -> {
            Dialog dialog = new Dialog();
            dialog.setWidth("400px");
            dialog.setDraggable(true);
            dialog.setResizable(true);
            dialog.setCloseOnOutsideClick(false);
            dialog.setHeaderTitle("Dialog");
            dialog.add(
                new Paragraph("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam imperdiet aliquet magna, non bibendum dolor iaculis eget."),
                new Paragraph("Aenean eget finibus odio. Nunc lobortis purus a vehicula pulvinar. Curabitur sit amet tortor metus. Aliquam volutpat fermentum volutpat."));
            Button cancelButton = new Button("Cancel", event -> dialog.close());
            Button saveButton = new Button("Save", event -> dialog.close());
            saveButton.addThemeVariants(ButtonVariant.LUMO_PRIMARY);
            dialog.getFooter().add(cancelButton, saveButton);
            dialog.open();
        });

        return dialogButton;
    }

    private Button createConfirmDialogButton(String buttonLabel) {
        Button dialogButton = new Button(buttonLabel);
        dialogButton.addClickListener(e -> {
            ConfirmDialog dialog = new ConfirmDialog();
            dialog.setHeader("Unsaved changes");
            dialog.setText("There are unsaved changes. Do you want to discard or save them?");
            dialog.setCancelable(true);
            dialog.setRejectable(true);
            dialog.setRejectText("Discard");
            dialog.setRejectButtonTheme("error");
            dialog.setConfirmText("Save");
            dialog.open();
        });

        return dialogButton;
    }


    private Component createMessagesExample() {
        MessageList list = new MessageList();
        Instant yesterday = LocalDateTime.now().minusDays(1)
            .toInstant(ZoneOffset.UTC);
        Instant fiftyMinsAgo = LocalDateTime.now().minusMinutes(50)
            .toInstant(ZoneOffset.UTC);
        MessageListItem message1 = new MessageListItem(
            "Linsey, did you know these apps can be fully styled?",
            yesterday, "Matt Mambo");
        message1.setUserColorIndex(1);
        MessageListItem message2 = new MessageListItem("Yup. Lumo is always there as the base and modifications can be applied on top.",
            fiftyMinsAgo, "Linsey Listy");
        message2.setUserColorIndex(2);
        MessageListItem message3 = new MessageListItem(
            "Cool!",
            yesterday, "Matt Mambo");
        message3.setUserColorIndex(1);
        list.setItems(Arrays.asList(message1, message2, message3));

        MultiFileMemoryBuffer buffer = new MultiFileMemoryBuffer();
        Upload upload = new Upload(buffer);
        upload.setAutoUpload(false);

        return createCard("Message list", list, new H3("File upload"), upload);
    }

    private Component createTypographyExample() {
        VerticalLayout container = new VerticalLayout();
        container.setPadding(false);
        H1 h1 = new H1("Heading XXXL");
        H2 h2 = new H2("Heading XXL");
        H3 h3 = new H3("Heading XL");
        H4 h4 = new H4("Heading L");
        H5 h5 = new H5("Heading M");
        H6 h6 = new H6("Heading S");
        Span body = new Span("Body text");
        Span smallBody = new Span("Small body text");
        smallBody.addClassNames(LumoUtility.FontSize.SMALL);
        Span textXs = new Span("Text XS");
        textXs.addClassNames(LumoUtility.FontSize.XSMALL);
        Span textXxs = new Span("Text XXS");
        textXxs.addClassNames(LumoUtility.FontSize.XXSMALL);

        container.add(h1, h2, h3, h4, h5, h6, body, smallBody, textXs, textXxs);

        return createCard("Typography Example", container);
    }

    private static FlexLayout createCard(Component... components) {
        FlexLayout layout = new FlexLayout();
        layout.setFlexDirection(FlexLayout.FlexDirection.COLUMN);
        layout.addClassName("card");
        layout.addClassName(LumoUtility.Gap.MEDIUM);
        layout.add(components);
        return layout;
    }
    private static FlexLayout createCard(String heading, Component... components) {
        FlexLayout layout = new FlexLayout();
        layout.setFlexDirection(FlexLayout.FlexDirection.COLUMN);
        layout.addClassName("card");
        layout.addClassName(LumoUtility.Gap.MEDIUM);
        if (!heading.isEmpty()) {
            layout.add(new H3(heading));
        }
        layout.add(components);
        return layout;
    }

    private static FlexLayout createCard(String heading, String classnames, Component... components) {
        FlexLayout layout = new FlexLayout();
        layout.setFlexDirection(FlexLayout.FlexDirection.COLUMN);
        layout.addClassName("card");
        layout.addClassName(classnames);
        if (!heading.isEmpty()) {
            layout.add(new H3(heading));
        }
        layout.add(components);
        return layout;
    }

    public List<SamplePerson> getPeople(){
        ArrayList<SamplePerson> people = new ArrayList<>();

        for (int i = 0; i < 20; i++) {
            SamplePerson person = new SamplePerson();
            person.setName("Firstname Lastname " + i);
            person.setEmail("firstname.lastname" + i +"@company.com");
            person.setOccupation("Developer");

            people.add(person);
        }
        return people;
    }

}
